import axiosInstance from "../utils/axiosInstance";
import type { ApiEnvelope, CursorPayload } from "../types/apiResponse";
import type { LPComment } from "../types/LpDto";

const PAGE_SIZE = 30;

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