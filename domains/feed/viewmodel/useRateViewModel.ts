import { useAuthStore } from "@/domains/auth/store";
import { feedApi } from "@/domains/feed/api";
import type {
  CreateFeedRequest,
  FeedImageRequest,
  FeedImageTag,
} from "@/domains/feed/model";
import { usePostStore } from "@/domains/feed/store";
import {
  useImageUploadViewModel,
  type UploadImageResult,
} from "./useImageUploadViewModel";
import { isMockEnabled } from "@/shared/utils";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useRateViewModel = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const {
    selectedAlcohols,
    alcoholRatings,
    currentRatingIndex,
    selectedPlace,
    placeRating,
    review,
    alcoholTagMappings,
    uploadedImages,
    setAlcoholRating,
    setCurrentRatingIndex,
    resetPost,
  } = usePostStore();

  const currentAlcohol = selectedAlcohols[currentRatingIndex];
  const totalAlcohols = selectedAlcohols.length;
  const [tempRating, setTempRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const { uploadImages, isUploading } = useImageUploadViewModel();

  const moveToNextAlcohol = () => {
    setCurrentRatingIndex(currentRatingIndex + 1);
    setTempRating(0);
  };

  const completeAllRatings = async (): Promise<boolean> => {
    // AUTH GUARD - return false to trigger modal in UI
    if (!isAuthenticated) {
      return false;
    }

    if (isMockEnabled()) {
      completeWithMockData();
      return true;
    }

    return await completeWithApi();
  };

  const completeWithMockData = () => {
    const mockUploadResults = uploadedImages.map((uri, idx) => ({
      localUri: uri,
      objectKey: `mock-feed-images/image-${idx}.jpg`,
    }));

    const feedRequest = buildFeedRequest(mockUploadResults);
    const liquorReviews = selectedAlcohols.map((a) => ({
      liquorId: a.id,
      score: alcoholRatings[a.id] || 0,
      text: "",
    }));

    console.log("=== Mock Feed Request ===");
    console.log("POST /feeds:", JSON.stringify(feedRequest, null, 2));
    console.log("POST /liquors/{id}/reviews:", liquorReviews);
    console.log("=========================");

    resetPost();
    router.replace("/map");
  };

  const completeWithApi = async (): Promise<boolean> => {
    try {
      setIsSaving(true);

      const uploadedImageResults = await uploadAllImages();
      const feedRequest = buildFeedRequest(uploadedImageResults);

      await feedApi.createFeed(feedRequest);
      await createAllLiquorReviews();

      resetPost();
      router.replace("/map");
      return true;
    } catch (error) {
      console.error("[Feed Creation Error]", error);
      Alert.alert("피드 작성 실패", "다시 시도해주세요.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const uploadAllImages = async () => {
    return await uploadImages(uploadedImages);
  };

  const buildFeedRequest = (
    uploadedImageResults: UploadImageResult[],
  ): CreateFeedRequest => {
    const images = buildFeedImages(uploadedImageResults);

    return {
      score: placeRating,
      text: review,
      images,
      kakaoPlaceId: selectedPlace?.id,
      placeName: selectedPlace?.name,
      placeAddress: selectedPlace?.address,
    };
  };

  const buildFeedImages = (
    uploadedImageResults: UploadImageResult[],
  ): FeedImageRequest[] => {
    return uploadedImageResults.map((img) => ({
      imageUrl: img.objectKey,
      tags: buildTagsForImage(img.localUri),
    }));
  };

  const buildTagsForImage = (localUri: string): FeedImageTag[] => {
    const imageIndex = findImageIndex(localUri);

    return alcoholTagMappings
      .filter((m) => m.imageIndex === imageIndex)
      .map((m) => {
        const alcohol = selectedAlcohols.find((a) => a.id === m.alcoholId);

        return {
          liquorId: m.alcoholId,
          liquorName: alcohol?.name ?? "",
          x: m.tagPosition.x,
          y: m.tagPosition.y,
        };
      });
  };

  const findImageIndex = (localUri: string): number => {
    return uploadedImages.indexOf(localUri);
  };

  const createAllLiquorReviews = async () => {
    const promises = selectedAlcohols.map((alcohol) =>
      createLiquorReview(alcohol.id),
    );

    await Promise.all(promises);
  };

  const createLiquorReview = async (alcoholId: string) => {
    const rating = alcoholRatings[alcoholId] || 0;
    await feedApi.createLiquorReview(alcoholId, { score: rating, text: "" });
  };

  const handleSaveRating = async (): Promise<boolean> => {
    if (!currentAlcohol) return true;

    setAlcoholRating(currentAlcohol.id, tempRating);

    if (currentRatingIndex < totalAlcohols - 1) {
      moveToNextAlcohol();
      return true;
    }

    return await completeAllRatings();
  };

  return {
    currentAlcohol,
    currentRatingIndex,
    totalAlcohols,
    tempRating,
    setTempRating,
    handleSaveRating,
    alcoholRatings,
    selectedAlcohols,
    isSaving,
    isUploading,
  };
};
