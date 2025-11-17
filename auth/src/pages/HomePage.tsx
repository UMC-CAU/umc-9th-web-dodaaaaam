import { useEffect, useRef, useState } from "react";
import { useLpListQuery } from "../hooks/useLpQuery";
import LPCard from "../components/LPCard";
import type { LP } from "../types/LpDto";
import LpSkeletonCard from "../components/LPSkeletonCard";

type Order = "desc" | "asc";

const HomePage = () => {
  const [order, setOrder] = useState<Order>("asc");
  const searchString: string | null = null; 

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLpListQuery(searchString, order);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer로 바닥에서 자동 로드
  useEffect(() => {
    if (!observerRef.current) return;
    const el = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "0px 0px 200px 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, order]);

  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {String(error)}
      </div>
    );

  const lps: LP[] =
    data?.pages.flatMap((p) => p.data?.data ?? []) ?? [];

  return (
    <div className="min-h-dvh bg-white text-zinc-900">
      <main className="w-full flex justify-center">
        <div className="w-full max-w-6xl py-10 px-5">
          {/* 상단 헤더: 정렬 버튼 */}
          <div className="mb-6 flex items-right justify-end">
            <div className="inline-flex rounded-lg border border-zinc-200 overflow-hidden">
              <button
                type="button"
                aria-pressed={order === "desc"}
                onClick={() => setOrder("desc")}
                className={
                  "px-3 py-1.5 text-sm transition-colors " +
                  (order === "desc"
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-700 hover:bg-zinc-100")
                }
              >
                최신순
              </button>
              <button
                type="button"
                aria-pressed={order === "asc"}
                onClick={() => setOrder("asc")}
                className={
                  "px-3 py-1.5 text-sm border-l border-zinc-200 transition-colors " +
                  (order === "asc"
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-700 hover:bg-zinc-100")
                }
              >
                오래된순
              </button>
            </div>
          </div>

          {/* 그리드 */}
          <div
            className="
              grid 
              grid-cols-2 
              sm:grid-cols-3 
              md:grid-cols-4 
              lg:grid-cols-5 
              gap-8
              justify-items-center
            "
          >
            {isFetchingNextPage ? (
              // 초기 로딩 시 스켈레톤 카드 여러 개
              Array.from({ length: 10 }).map((_, idx) => (
                <LpSkeletonCard key={idx} />
              ))
            ) : lps.length === 0 ? (
              <p className="col-span-full text-center text-zinc-500">
                등록된 LP가 없습니다.
              </p>
            ) : (
              lps.map((lp) => <LPCard key={lp.id} lp={lp} />)
            )}
          </div>

          {/* 감시용 센티넬 */}
          <div ref={observerRef} className="h-10" />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
