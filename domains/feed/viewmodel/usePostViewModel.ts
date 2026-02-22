import { usePostStore } from "@/domains/feed/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

export const usePostViewModel = () => {
  const router = useRouter();

  const {
    selectedPlace,
    placeRating,
    review,
    isRatingModalVisible,
    tempRating,
    selectedAlcohols,
    uploadedImages,
    setPlaceRating,
    setReview,
    setIsRatingModalVisible,
    setTempRating,
    resetPost,
  } = usePostStore();

  const isPlaceSelected = selectedPlace !== null;

  useEffect(() => {
    if (isPlaceSelected && placeRating === 0) {
      handleOpenRatingModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlace]);

  const handlePlaceSelect = () => {
    router.push("/add?type=place");
  };

  const handleOpenRatingModal = () => {
    setTempRating(placeRating);
    setIsRatingModalVisible(true);
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalVisible(false);
  };

  const handleSaveRating = () => {
    setPlaceRating(tempRating);
    setIsRatingModalVisible(false);
  };

  const handleTempRatingChange = (rating: number) => {
    setTempRating(rating);
  };

  const handleReviewChange = (text: string) => {
    setReview(text);
  };

  const handleBackPress = () => {
    Alert.alert(
      "작성 취소",
      "작성 중인 내용이 모두 삭제됩니다.\n정말 나가시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "나가기",
          style: "destructive",
          onPress: () => {
            resetPost();
            router.push("/map");
          },
        },
      ],
    );
  };

  const handleNextPress = () => {
    router.push("/rate");
  };

  const isNextButtonEnabled = uploadedImages.length > 0;

  return {
    selectedPlace,
    placeRating,
    review,
    isPlaceSelected,
    isNextButtonEnabled,
    isRatingModalVisible,
    tempRating,
    selectedAlcohols,
    handlePlaceSelect,
    handleReviewChange,
    handleOpenRatingModal,
    handleCloseRatingModal,
    handleSaveRating,
    handleTempRatingChange,
    handleBackPress,
    handleNextPress,
  };
};
