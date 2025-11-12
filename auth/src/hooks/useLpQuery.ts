import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchLPs, fetchLPDetail } from "../apis/fetchLP";

export const useLpListQuery = (
  searchString: string | null,
  sort: string
) => {
  return useInfiniteQuery({
    queryKey: [ 'lps' , { sort } ],
    queryFn: fetchLPs(searchString, sort),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage.data?.nextCursor;
      return nextCursor ?? undefined;
    },
    staleTime: 30_000,           
    gcTime: 5 * 60 * 1000,      
    retry: 1,
  });
}

export const useLpQuery = (lpId: number) => {
  return useQuery({
    queryKey: [ 'lp' , lpId],
    queryFn: () => fetchLPDetail(lpId),
    staleTime: 30_000,           
    gcTime: 5 * 60 * 1000,      
    retry: 1,
  });
}