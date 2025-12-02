import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../apis/CommentApis";
import type {
  createCommentRequest,
  deleteCommentRequest,
  updateCommentRequest,
} from "../types/CommentDto";

/**
 * 댓글 생성 
 */
export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: createCommentRequest) => createComment(payload),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", variables.lpId],
      });
    },

    onError: (error) => {
      console.error("[createComment] 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    },
  });
};

/**
 * 댓글 수정
 */
export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: updateCommentRequest) => updateComment(payload),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", variables.lpId],
      });
    },

    onError: (error) => {
      console.error("[updateComment] 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    },
  });
};

/**
 * 댓글 삭제 
 */
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: deleteCommentRequest) => deleteComment(payload),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", variables.lpId],
      });
    },

    onError: (error) => {
      console.error("[deleteComment] 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    },
  });
};