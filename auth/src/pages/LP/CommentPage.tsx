import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLpCommentQuery } from "../../hooks/useCommentQuery";
import type { 
  createCommentRequest, 
  deleteCommentRequest, 
  updateCommentRequest,
  LPComment 
} from "../../types/CommentDto";
import { CommentSkeleton } from "../../components/LP/CommentSkeleton";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../hooks/useCommentMutation";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type Order = "asc" | "desc";

export function CommentPage() {
  const [order, setOrder] = useState<Order>("asc");
  const { lpId } = useParams<{ lpId: string }>();
  const id = Number(lpId);

  const { mutate: createComment } = useCreateCommentMutation();
  const { mutate: deleteCommentMutate } = useDeleteCommentMutation();
  const { mutate: updateCommentMutate } = useUpdateCommentMutation();

  // 작성 폼 
  const [createForm, setcreateForm] = useState<createCommentRequest>({
    lpId: id,
    content: "",
  })

  // 수정 모드 상태
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLpCommentQuery(id, order);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setcreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createComment(createForm, {
      onSuccess: () => {
        alert("LP 생성에 성공했습니다.");
        setcreateForm((prev) => ({ ...prev, content: "" }));
      },
      onError: (error) => {
        console.log("[LP 생성 실패]: ", error);
        alert("LP 생성에 실패했습니다.");
      },
    });
  };

  // 삭제
  const handleDeleteComment = (commentId: number) => {
    if (!confirm("이 댓글을 삭제할까요?")) return;

    const payload: deleteCommentRequest = {
      lpId: id,
      commentId,
    };

    deleteCommentMutate(payload);
  };

  // 수정 시작
  const handleStartEdit = (comment: LPComment) => {
    setEditingId(comment.id);
    setEditingContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };

  // 수정 저장
  const handleSaveEdit = (commentId: number) => {
    const payload: updateCommentRequest = {
      lpId: id,
      commentId,
      content: editingContent,
    };

    updateCommentMutate(payload, {
      onSuccess: () => {
        setEditingId(null);
        setEditingContent("");
      },
    });
  };

  // 무한 스크롤용 sentinel
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {String(error)}
      </div>
    );
  }

  // 페이지에서 댓글 배열로 풀어내기
  const comments: LPComment[] =
    data?.pages.flatMap((p) => p.data?.data ?? []) ?? [];

  return (
    <div className="min-h-screen flex items-start justify-center py-10">
      <div
        className="
          w-full max-w-3xl
          bg-gray-100
          rounded-2xl
          shadow-lg
          p-8
          border border-gray-200
        "
      >
        {/* 상단 헤더: 정렬 버튼 */}
        <div className="mb-6 flex items-center justify-between">
          <p className="mr-4 text-gray-700 justify-start">
            댓글
          </p>
          <div className="inline-flex rounded-lg border border-zinc-200 overflow-hidden justify-end">
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
        
        {/* 댓글 작성 폼 */}
        <form onSubmit={handleSubmit} className="mb-6 flex items-stretch h-13 justify-between ">
          <input
            name="content"
            value={createForm.content}
            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-zinc-400"
            placeholder="댓글을 작성해보세요."
            onChange={handleChange}
          />
          <button
            type="submit"
            className="ml-4 h-full px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            작성
          </button>
        </form>

        {/* 로딩 중일 때 스켈레톤 */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        )}

        {/* 실제 댓글 리스트 */}
        {!isLoading && comments.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            아직 댓글이 없어요.
          </p>
        )}

        {!isLoading && comments.length > 0 && (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm"
              >
                {/* 프로필 이미지 */}
                {comment.author?.avatar ? (
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-white text-sm">
                    {comment.author?.name?.[0] ?? "?"}
                  </div>
                )}

                {/* 이름 + 내용 */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {comment.author?.name ?? "익명"}
                  </p>
                  {editingId === comment.id ? (
                    <div className="mt-2 space-y-2">
                      <input
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <div className="flex gap-2 text-xs">
                        <button
                          type="button"
                          className="px-3 py-1 rounded bg-emerald-500 text-white"
                          onClick={() => handleSaveEdit(comment.id)}
                        >
                          저장
                        </button>
                          <button
                          type="button"
                          className="px-3 py-1 rounded bg-gray-200 text-gray-700"
                          onClick={handleCancelEdit}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                      {comment.content}
                    </p>
                  )}
                  
                </div>
                {/* 아이콘 */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    className="text-gray-500 hover:text-emerald-600 transition"
                    onClick={() => handleStartEdit(comment)}
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-500 transition"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                  </div>
              </li>
            ))}
          </ul>
        )}

        {/* 다음 페이지 로딩 중일 때 스켈레톤 */}
        {isFetchingNextPage && (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <CommentSkeleton key={`next-${i}`} />
            ))}
          </div>
        )}

        {/* 아래에 붙는 sentinel (보이면 다음 페이지 요청) */}
        <div ref={loadMoreRef} className="h-8" />

        {/* hasNextPage 없을 때 '마지막' 안내 같은 것도 가능 */}
        {!hasNextPage && !isLoading && comments.length > 0 && (
          <p className="text-center text-gray-400 text-xs">
            마지막 댓글까지 다 봤어요.
          </p>
        )}
      </div>
    </div>
  );
}
