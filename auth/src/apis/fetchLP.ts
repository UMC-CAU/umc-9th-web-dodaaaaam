import axiosInstance from "../utils/axiosInstance";
import type { ApiEnvelope, CursorPayload } from "../types/apiResponse";
import type { LP, LPComment } from "../types/LpDto";

const PAGE_SIZE = 30;

export const fetchLPs = (searchString: string | null, order: string) => 
  async ( { 
    pageParam = 0
  }: { 
    pageParam?: number; 
  }): Promise<ApiEnvelope<CursorPayload<LP>>> => {
    const params = new URLSearchParams({
      limit: String(PAGE_SIZE),
      order,
    });

    if (pageParam !== 0) {
      params.append("cursor", String(pageParam));
    }

    if (searchString && searchString.trim().length > 0) {
      params.append("search", searchString.trim());
    }

    const response = await axiosInstance.get<ApiEnvelope<CursorPayload<LP>>>(
      `/lps?${params.toString()}`
    );
    console.log(response.data);
  return response.data; 
};

export const fetchLPDetail = async (
  id: number
): Promise<ApiEnvelope<LP>> => {
  const response = await axiosInstance.get<ApiEnvelope<LP>>(`/lps/${id}`);
  return response.data;
};

export const fetchLPComment = async (
  id: number,
  order: string,
  pageParam: number = 0
): Promise<ApiEnvelope<CursorPayload<LPComment>>> => {
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    order,
  });

  if (pageParam !== 0) {
    params.append("cursor", String(pageParam));
  }

  const response = await axiosInstance.get<
    ApiEnvelope<CursorPayload<LPComment>>
  >(`/lps/${id}/comments?${params.toString()}`); 

  console.log(response.data);
  return response.data;
};