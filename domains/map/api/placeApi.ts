import type { PlaceResponse, PlaceSearchResponse } from "@/domains/map/model";
import { API_ENDPOINTS, apiClient } from "@/shared/api";

export interface GetPlacesInRegionParams {
  minLongitude: number;
  maxLongitude: number;
  minLatitude: number;
  maxLatitude: number;
}

export interface SearchPlacesParams {
  keyword: string;
  page?: number;
  size?: number;
}

export const placeApi = {
  async getPlacesInRegion(
    params: GetPlacesInRegionParams,
  ): Promise<PlaceResponse[]> {
    const { minLongitude, maxLongitude, minLatitude, maxLatitude } = params;
    const queryString = new URLSearchParams({
      minLongitude: minLongitude.toString(),
      maxLongitude: maxLongitude.toString(),
      minLatitude: minLatitude.toString(),
      maxLatitude: maxLatitude.toString(),
    }).toString();

    const response = await apiClient<{ data: PlaceResponse[] }>(
      `${API_ENDPOINTS.PLACE.GET_PLACES_IN_REGION}?${queryString}`,
      { method: "GET" },
    );

    return response.data;
  },

  async searchPlaces(
    params: SearchPlacesParams,
  ): Promise<PlaceSearchResponse[]> {
    const { keyword, page = 1, size = 15 } = params;
    const queryString = new URLSearchParams({
      keyword,
      page: page.toString(),
      size: size.toString(),
    }).toString();

    const response = await apiClient<{
      data: {
        items: PlaceSearchResponse[];
        nextCursor: string | null;
        hasNext: boolean;
      };
    }>(`${API_ENDPOINTS.INFRA.SEARCH_PLACES}?${queryString}`, {
      method: "GET",
    });

    return response.data.items;
  },
};
