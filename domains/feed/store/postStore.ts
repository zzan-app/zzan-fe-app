import {
  Alcohol,
  AlcoholTagInfo,
  Place,
  PlaceWithRating,
  TagPosition,
} from "@/domains/feed/model";
import { create } from "zustand";

interface PostStore {
  selectedPlace: PlaceWithRating | null;
  placeRating: number;
  review: string;
  isRatingModalVisible: boolean;
  tempRating: number;
  selectedAlcohols: Alcohol[];
  editingTagIndex: number | null;
  alcoholRatings: { [alcoholId: string]: number };
  currentRatingIndex: number;
  focusedAlcoholId: string | null;
  uploadedImages: string[];
  alcoholTagMappings: AlcoholTagInfo[];
  currentImageIndex: number;
  imageTags: Map<number, TagPosition[]>;

  setSelectedPlace: (place: Place) => void;
  setPlaceRating: (rating: number) => void;
  setReview: (text: string) => void;
  setIsRatingModalVisible: (visible: boolean) => void;
  setTempRating: (rating: number) => void;
  addSelectedAlcohol: (alcohol: Alcohol) => void;
  removeSelectedAlcohol: (alcoholId: string) => void;
  setEditingTagIndex: (index: number | null) => void;
  setAlcoholRating: (alcoholId: string, rating: number) => void;
  setCurrentRatingIndex: (index: number) => void;
  setFocusedAlcoholId: (alcoholId: string | null) => void;
  getAllAlcoholsRated: () => boolean;
  setUploadedImages: (images: string[]) => void;
  addAlcoholTagMapping: (
    alcoholId: string,
    imageIndex: number,
    position: TagPosition,
  ) => void;
  setCurrentImageIndex: (index: number) => void;
  setImageTags: (tags: Map<number, TagPosition[]>) => void;
  addImageTag: (imageIndex: number, position: TagPosition) => void;
  resetPost: () => void;
}

export const usePostStore = create<PostStore>((set, get) => ({
  selectedPlace: null,
  placeRating: 0,
  review: "",
  isRatingModalVisible: false,
  tempRating: 0,
  selectedAlcohols: [],
  editingTagIndex: null,
  alcoholRatings: {},
  currentRatingIndex: 0,
  focusedAlcoholId: null,
  uploadedImages: [],
  alcoholTagMappings: [],
  currentImageIndex: 0,
  imageTags: new Map(),

  setSelectedPlace: (place: Place) => {
    const placeWithRating: PlaceWithRating = {
      ...place,
      feedCount: 0,
      rating: 0,
    };
    set({ selectedPlace: placeWithRating, placeRating: 0 });
  },

  setPlaceRating: (rating: number) => set({ placeRating: rating }),
  setReview: (text: string) => set({ review: text }),
  setIsRatingModalVisible: (visible: boolean) =>
    set({ isRatingModalVisible: visible }),
  setTempRating: (rating: number) => set({ tempRating: rating }),

  addSelectedAlcohol: (alcohol: Alcohol) =>
    set((state) => ({
      selectedAlcohols: state.selectedAlcohols.some((a) => a.id === alcohol.id)
        ? state.selectedAlcohols
        : [...state.selectedAlcohols, alcohol],
    })),

  removeSelectedAlcohol: (alcoholId: string) =>
    set((state) => ({
      selectedAlcohols: state.selectedAlcohols.filter(
        (a) => a.id !== alcoholId,
      ),
    })),

  setEditingTagIndex: (index: number | null) => set({ editingTagIndex: index }),

  setAlcoholRating: (alcoholId: string, rating: number) =>
    set((state) => ({
      alcoholRatings: { ...state.alcoholRatings, [alcoholId]: rating },
    })),

  setCurrentRatingIndex: (index: number) => set({ currentRatingIndex: index }),

  setFocusedAlcoholId: (alcoholId: string | null) =>
    set({ focusedAlcoholId: alcoholId }),

  getAllAlcoholsRated: () => {
    const state = get();
    const alcoholIds = state.selectedAlcohols.map((alcohol) => alcohol.id);
    return alcoholIds.every((id) => state.alcoholRatings[id] !== undefined);
  },

  setUploadedImages: (images: string[]) => set({ uploadedImages: images }),

  addAlcoholTagMapping: (
    alcoholId: string,
    imageIndex: number,
    position: TagPosition,
  ) =>
    set((state) => ({
      alcoholTagMappings: [
        ...state.alcoholTagMappings,
        { alcoholId, imageIndex, tagPosition: position },
      ],
    })),

  setCurrentImageIndex: (index: number) => set({ currentImageIndex: index }),

  setImageTags: (tags: Map<number, TagPosition[]>) => set({ imageTags: tags }),

  addImageTag: (imageIndex: number, position: TagPosition) =>
    set((state) => {
      const newTags = new Map(state.imageTags);
      const currentTags = newTags.get(imageIndex) || [];
      newTags.set(imageIndex, [...currentTags, position]);
      return { imageTags: newTags };
    }),

  resetPost: () =>
    set({
      selectedPlace: null,
      placeRating: 0,
      review: "",
      isRatingModalVisible: false,
      tempRating: 0,
      selectedAlcohols: [],
      editingTagIndex: null,
      alcoholRatings: {},
      currentRatingIndex: 0,
      focusedAlcoholId: null,
      uploadedImages: [],
      alcoholTagMappings: [],
      currentImageIndex: 0,
      imageTags: new Map(),
    }),
}));
