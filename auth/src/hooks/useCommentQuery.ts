import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLPComment } from "../apis/CommentApis";

type Order = "desc" | "asc";

export const useLpCommentQuery = (
  lpId: number,
  order: Order
) => {
  return useInfiniteQuery({
    queryKey: ['lpComments', lpId, order],
    queryFn: ({ pageParam = 0 }) => fetchLPComment(lpId, order, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage.data?.nextCursor;
      return nextCursor ?? undefined;
    },
    staleTime: 30_000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!lpId,
  });
};