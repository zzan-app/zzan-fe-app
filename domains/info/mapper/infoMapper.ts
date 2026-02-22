import type { ImageSourcePropType } from "react-native";

import type {
  AlcoholInfo,
  ImageWithDescription,
  LiquorDetailApiResponse,
  PlaceDetailApiResponse,
  PlaceInfo,
} from "@/domains/info/model";

const exampleImage = require("@/assets/images/example_image.png");

const HEADER_IMAGE_MAP: Record<string, ImageSourcePropType> = {
  양조장: require("@/assets/basic_mock_images/brewery.png"),
  원재료: require("@/assets/basic_mock_images/ingredients.png"),
  외관: require("@/assets/basic_mock_images/looking.png"),
  향: require("@/assets/basic_mock_images/smell.png"),
  맛: require("@/assets/basic_mock_images/taste.png"),
  특징: require("@/assets/basic_mock_images/feature.png"),
};

const DEFAULT_GALLERY_IMAGES: ImageWithDescription[] = Object.entries(
  HEADER_IMAGE_MAP,
).map(([header, image]) => ({
  image,
  descriptionTitle: header,
  descriptionCategory: "정보가 없습니다",
}));

const getImageForHeader = (header: string): ImageSourcePropType => {
  return HEADER_IMAGE_MAP[header] || exampleImage;
};

const createImageWithDescription = (
  imageUrl: string,
): ImageWithDescription => ({
  image: { uri: imageUrl },
  descriptionTitle: "",
  descriptionCategory: "",
});

const createDefaultImage = (): ImageWithDescription => ({
  image: exampleImage,
  descriptionTitle: "",
  descriptionCategory: "",
});

export const mapLiquorApiToAlcoholInfo = (
  api: LiquorDetailApiResponse,
): AlcoholInfo => {
  const images = api?.imageUrl
    ? [createImageWithDescription(api.imageUrl)]
    : [createDefaultImage()];

  const descriptionArray = Array.isArray(api?.description)
    ? api.description
    : [];
  const galleryImages: ImageWithDescription[] = descriptionArray.map(
    (item) => ({
      image: getImageForHeader(item.header),
      descriptionTitle: item.header,
      descriptionCategory: item.content?.trim() || "정보가 없습니다",
    }),
  );

  return {
    id: api.id,
    name: api.name,
    category: api.type || "",
    images,
    option1: api.volume || "정보 없음",
    option2: api.content || "정보 없음",
    option3: api.brewery || "정보 없음",
    option4: api.etc || "정보 없음",
    isBookmarked: false,
    rating: api.score || 0,
    reviews: [],
    recommendTitle: "페어링 안주 추천",
    recommendDescription: api.foodPairing || "정보 없음",
    galleryImages:
      galleryImages.length > 0 ? galleryImages : DEFAULT_GALLERY_IMAGES,
  };
};

export const mapPlaceApiToPlaceInfo = (
  api: PlaceDetailApiResponse,
): PlaceInfo => {
  const phoneAddress = `${api.phone ? api.phone + " " : ""}${api.address}`;

  return {
    id: api.id,
    name: api.name,
    category: "",
    images: [],
    option1: phoneAddress,
    option2: "정보 없음",
    option3: "정보 없음",
    option4: "정보 없음",
    isBookmarked: false,
    rating: api.averageScore || 0,
    reviews: [],
    description: api.address,
    kakaoPlaceId: api.kakaoPlaceId,
  };
};
