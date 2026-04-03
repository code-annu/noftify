import axiosInstance from "../../config/axios-client";

export async function patchRequest<T>(endpoint: string, body?: unknown) {
  const response = await axiosInstance.patch(`${endpoint}`, body, {
    method: "PATCH",
  });
  return response.data as T;
}
