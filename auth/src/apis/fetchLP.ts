import axiosInstance from "../utils/axiosInstance";
import type { ApiEnvelope, CursorPayload } from "../types/apiResponse";
import type { LP } from "../types/LpDto";

const PAGE_SIZE = 30;

export const fetchLPs = (searchString: string | null, order: string) => async ( { pageParam = 1 }: { pageParam?: number } ): Promise<ApiEnvelope<CursorPayload<LP>>> => {
  const response = await axiosInstance.get<ApiEnvelope<CursorPayload<LP>>>("/lps?cursor=" + pageParam + "&limit=" + PAGE_SIZE + `&order=${order}`);
  console.log("/lps?cursor=" + pageParam + "&limit=" + PAGE_SIZE + `&order=${order}`);
  return response.data; 
};

export const fetchLPDetail = async (id: number): Promise<ApiEnvelope<LP>> => {
  const response = await axiosInstance.get<ApiEnvelope<LP>>(`/lps/${id}`);
  return response.data;
};