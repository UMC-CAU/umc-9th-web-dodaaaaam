import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { signinRequest, updateProfileRequest } from "../types/UserDto"
import { signin, signout, updateMyInfo } from "../apis/authApis"
import { useAuthStore } from "../store/authStore";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: updateProfileRequest) => updateMyInfo(payload),

    onSuccess: (updated) => {
      useAuthStore.getState().setUser({
        user: {
          id: updated.id,
          name: updated.name,
        }
      })
      queryClient.invalidateQueries({
        queryKey: ["myInfo"],
      });
    },

    onError: (error) => {
      console.error("[updateMyProfile] 실패:", error);
      alert("내 정보 수정에 실패했습니다.");
    },
  });
};

export const useSigninMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: signinRequest) => signin(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myInfo"],
      });
    },

    onError: (error) => {
      console.error("[signin] 실패:", error);
      alert("로그인에 실패했습니다.");
    },
  });
};

export const useSignoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => signout(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myInfo"],
      });
    },

    onError: (error) => {
      console.error("[signout] 실패:", error);
      alert("로그아웃에 실패했습니다.");
    },
  });
};