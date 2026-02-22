export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
  timestamp?: number;
}

export interface ApiError {
  success: false;
  data: null;
  message: string;
  timestamp: number;
}
