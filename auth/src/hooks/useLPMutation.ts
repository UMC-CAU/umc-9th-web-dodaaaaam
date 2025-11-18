import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLP } from "../apis/LPApis";
import type { CreateLpRequest } from "../types/LpDto";

export const useCreateLpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createLP"],
    mutationFn: (payload: CreateLpRequest) => createLP(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },

    onError: (error) => {
      alert(error);
    },
  });
};