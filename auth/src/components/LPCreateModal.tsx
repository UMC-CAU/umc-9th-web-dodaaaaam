import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useCreateLpMutation } from "../hooks/useLPMutation";
import type { CreateLpRequest } from "../types/LpDto";
import LPImage from "../assets/LP.jpg";

interface LpCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LpCreateModal({ isOpen, onClose }: LpCreateModalProps) {
  const navigate = useNavigate();
  const { mutate: createLp, isPending } = useCreateLpMutation();

  const [form, setForm] = useState<CreateLpRequest>({
    title: "",
    content: "",
    thumbnail: "",
    tags: [],
    published: false,
  });

  const [tagInput, setTagInput] = useState("");

  // 이미지 미리보기(화면용) + 숨겨진 파일 input 제어용 ref
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null; // 열려있지 않으면 렌더 X

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;

    // 이미 있는 태그면 무시 (원하면 중복 허용해도 됨)
    if (form.tags.includes(trimmed)) {
      setTagInput("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, trimmed],
    }));
    setTagInput("");
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  }

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 화면 미리보기용 (blob URL)
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    setForm((prev) => ({
      ...prev,
      thumbnail: "", 
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createLp(form, {
      onSuccess: (data) => {
        onClose();
        navigate(`/lps/${data.data.id}`);
      },
      onError: (error) => {
        console.error("[LP CREATE] 실패:", error);
        alert("LP 생성에 실패했습니다.");
      },
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div 
        className="p-7 w-full max-w-sm rounded-lg bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 + 닫기 버튼 */}
        <div className="mb-5 py flex items-center justify-between gap-3 shrink-0">
          <h2 className="text-lg font-semibold text-zinc-600">새 LP 등록</h2>
          <button
            className="mr-2 text-zinc-500 hover:text-zinc-700 text-2xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* title 위에 LP 판 + 이미지 업로드 영역 */}
          <div className="flex flex-col items-center mb-2 p-6">
            {/* LP 판 모양 컨테이너 (원판 + 중앙 사각형에 커버 이미지) */}
            <div
              className="relative w-50 h-50 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {/* 바닥에 깔릴 LP 판 이미지 (네 컴퓨터에서 가져온 거) */}
              <img
                src={LPImage}
                alt="LP 판"
                className="w-full h-full object-cover rounded-full"
              />
              {/* 업로드한 이미지가 있으면, LP 위에 사각형 커버처럼 표시 */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="LP 커버 미리보기"
                  className="absolute inset-1/2 
                            -translate-x-1/2 -translate-y-1/2
                            w-50 h-50 rounded-md object-cover shadow-md"
                />
              )}
            </div>

            {/* 숨겨진 파일 input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            {!imagePreview && (
              <p className="mt-2 text-xs text-zinc-400">
              이미지를 클릭하면 파일 탐색기가 열립니다
            </p>
            )}
            
          </div>

          {/* 제목, 설명 input */}
          <input
            name="title"
            placeholder="제목"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded border border-gray-400 px-2 py-1 bg-gray-100"
          />
          <input
            name="content"
            placeholder="설명"
            value={form.content}
            onChange={handleChange}
            className="w-full rounded border border-gray-400 px-2 py-1 bg-gray-100"
          />

          {/* 태그 입력 + 추가 버튼 */}
          <div >
            <div className="flex gap-2">
              <input
                placeholder="태그를 입력하세요"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 rounded border border-gray-400 px-2 py-1 bg-gray-100"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="shrink-0 rounded bg-zinc-600 px-3 py-1 text-sm text-white"
              >
                추가
              </button>
            </div>

            {/* 생성된 태그 리스트 */}
            {form.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-medium text-white"
                  >
                    #{tag}

                    {/* X 버튼 */}
                    <button
                      type="button"
                      onClick={() => handleDeleteTag(tag)}
                      className="ml-1 text-white/80 hover:text-white"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-3 py-1 text-sm border-gray-400 "
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-emerald-500 px-3 py-1 text-sm text-white disabled:opacity-60"
            >
              {isPending ? "생성 중..." : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}