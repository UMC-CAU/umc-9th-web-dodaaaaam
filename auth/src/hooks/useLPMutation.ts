import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  createLP,
  updateLP,
  deleteLP
} from "../apis/LPApis";
import type { LpRequest, UpdateLpRequest } from "../types/LpDto";

/**
 * LP 생성 
 */
export const useCreateLpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LpRequest) => createLP(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },

    onError: (error) => {
      alert(error);
    },
  });
};

/**
 * LP 수정 
 */
export const useUpdateLpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateLpRequest) => updateLP(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp"] });
    },

    onError: (error) => {
      alert(error);
    },
  });
};

/**
 * LP 삭제  
 */
export const useDeleteLpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteLP(id),

    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["lp", id] });
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },

    onError: (error) => {
      alert(error);
    },
  });
};