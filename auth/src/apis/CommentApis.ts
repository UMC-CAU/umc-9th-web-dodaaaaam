import axiosInstance from "../utils/axiosInstance";
import type { ApiEnvelope, CursorPayload } from "../types/apiResponse";
import type {
  LPComment,
  createCommentRequest,
  deleteCommentRequest,
  updateCommentRequest,
} from "../types/CommentDto";

const PAGE_SIZE = 30;
/**
 * 댓글 리스트 order순 조회 
 */
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

/**
 * 댓글 작성 
 */
export const createComment = async (
  payload: createCommentRequest
): Promise<ApiEnvelope<LPComment>> => {
  const res = await axiosInstance.post<ApiEnvelope<LPComment>>(
    `/lps/${payload.lpId}/comments`,
    { content: payload.content } 
  );

  return res.data;
};

/**
 * 댓글 수정
 */
export const updateComment = async (
  payload: updateCommentRequest
): Promise<ApiEnvelope<LPComment>> => {
  const res = await axiosInstance.patch<ApiEnvelope<LPComment>>(
    `/lps/${payload.lpId}/comments/${payload.commentId}`,
    { content: payload.content }
  );
  return res.data;
};
/**
 * 댓글 삭제 
 */
export const deleteComment = async (
  payload: deleteCommentRequest
): Promise<ApiEnvelope<LPComment>> => {
  const res = await axiosInstance.delete<ApiEnvelope<LPComment>>(
    `/lps/${payload.lpId}/comments/${payload.commentId}`
  );

  return res.data;
};