import axiosInstance from "../utils/axiosInstance";
import type { ApiEnvelope, CursorPayload } from "../types/apiResponse";
import type { LpRequest, UpdateLpRequest, LP } from "../types/LpDto";

const PAGE_SIZE = 30;

/**
 * 전체 LP 데이터 order순으로 조회 
 */
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

/**
 * 각 LP 상세 조회 
 */
export const fetchLPDetail = async (
  id: number
): Promise<ApiEnvelope<LP>> => {
  const response = await axiosInstance.get<ApiEnvelope<LP>>(`/lps/${id}`);
  return response.data;
};

/**
 * LP 생성 
 */
export const createLP = async (
  payload: LpRequest
): Promise<ApiEnvelope<LP>> => {
  const res = await axiosInstance.post("/lps", payload);
  return res.data;
};

/**
 * LP 수정 
 */
export const updateLP = async (
  payload: UpdateLpRequest
): Promise<ApiEnvelope<LP>> => {
  const res = await axiosInstance.patch<ApiEnvelope<LP>>(`/lps/${payload.id}`, payload.content);
  return res.data;
};

/**
 * LP 삭제 
 */
export const deleteLP = async (id: number) => {
  const res = await axiosInstance.delete(`/lps/${id}`);
  return res.data;
};