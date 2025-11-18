import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchLPs, fetchLPDetail } from "../apis/LPApis";
type Order = "desc" | "asc";

export const useLpListQuery = (
  searchString: string | null,
  order: Order
) => {
  return useInfiniteQuery({
    queryKey: [ 'lps' , { order } ],
    queryFn: fetchLPs(searchString, order),
    initialPageParam: 0,
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