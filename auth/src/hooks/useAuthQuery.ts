import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "../apis/authApis"

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60 * 5, // 5분동안 fresh
    retry: 1, // 실패 시 1회 재시도
  });
};