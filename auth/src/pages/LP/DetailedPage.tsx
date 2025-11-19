import { Link, useParams, useNavigate } from "react-router-dom";
import { useLpQuery } from "../../hooks/useLpQuery";
import { Heart, MessageSquare } from "lucide-react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useDeleteLpMutation, useUpdateLpMutation } from "../../hooks/useLPMutation";
import type { Tag, UpdateLpRequest } from "../../types/LpDto";
import { useEffect, useState } from "react";

export function DetailedPage() {
  const { lpId } = useParams<{ lpId: string }>();
  const id = Number(lpId);
  const navigate = useNavigate();

  const { data, isError, isPending } = useLpQuery(id);
  const { mutate: updateLp } = useUpdateLpMutation();
  const { mutate: deleteLp } = useDeleteLpMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    thumbnail: "",
    tagsText: "",
    published: true,
  });

  const LpData = data?.data;

  useEffect(() => {
    if (!LpData) return;

    setForm({
      title: LpData.title,
      content: LpData.content,
      thumbnail: LpData.thumbnail,
      tagsText: LpData.tags?.map((t: Tag) => t.name).join(", ") ?? "",
      published: LpData.published ?? true,
    });
  }, [LpData]);

  if (isPending) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError || !LpData) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error: 상세 정보를 불러오는 데 실패했습니다.
      </div>
    );
  }

  // 인풋/텍스트에어리어 공통 onChange
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 수정 아이콘 클릭 → 편집 모드 토글
  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  // 수정 폼 제출 → UpdateLpRequest payload 생성해서 뮤테이션 호출
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = form.tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: UpdateLpRequest = {
      id: LpData.id, // 여기서 LpData는 위에서 !LpData 걸렀기 때문에 non-null
      content: {
        title: form.title,
        content: form.content,
        thumbnail: form.thumbnail,
        tags: tagsArray,
        published: form.published,
      },
    };

    updateLp(payload, {
      onSuccess: () => {
        alert("LP가 수정되었습니다.");
        setIsEditing(false);
      },
      onError: (error) => {
        console.error("[LP 수정 실패]", error);
        alert("LP 수정에 실패했습니다.");
      },
    });
  };

  // 삭제 버튼 클릭 핸들러
  const handleDelete = () => {
    if (!window.confirm("정말 이 LP를 삭제하시겠습니까?")) return;

    deleteLp(id, {
      onSuccess: () => {
        alert("LP가 삭제되었습니다.");
        navigate("/");
      },
      onError: (error) => {
        console.error("[LP 삭제 실패]", error);
        alert("LP 삭제에 실패했습니다.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-top justify-center py-10">
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
        <header className="flex items-center justify-between">
          <p className="text-gray-800 mb-2">{LpData.author.name}</p>
          <p className="text-gray-800 mb-2">
            {new Date(LpData.createdAt).toLocaleDateString()}
          </p>
        </header>
        <hr className="border border-gray-300" />

        {/* 제목 + 아이콘 줄 */}
        <div className="flex items-center justify-between mt-3 mb-3">
          <h1 className="text-2xl font-bold flex-1 pr-4 break-words">
            {LpData.title}
          </h1>

          {/* 아이콘 */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              className="text-gray-500 hover:text-emerald-600 transition"
              onClick={handleEditClick}  // ✅ 여기 () 빼야 실행됨!
            >
              <FiEdit2 size={20} />
            </button>
            <button
              className="text-gray-500 hover:text-red-500 transition"
              onClick={handleDelete}     // ✅ 이것도 마찬가지
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>

        <img
          src={LpData.thumbnail}
          alt={LpData.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* 본문 */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {LpData.content}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mt-3 mb-2 justify-center">
          {LpData.tags?.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500 text-white text-ms"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-left gap-3">
          {/* 좋아요 */}
          <div className="flex items-center gap-1 text-gray-500">
            <Heart
              size={25}
              className={LpData.likes?.length ? "text-rose-500 fill-rose-500" : ""}
            />
            <span className="text-sm">{LpData.likes?.length ?? 0}</span>
          </div>

        {/* 댓글 아이콘 */}
          <Link
            to={`/lps/${LpData.id}/comments`}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <MessageSquare size={25} />
          </Link>
        </div>

        {/* 수정 폼 */}
        {isEditing && (
          <div className="mt-8 p-4 bg-white rounded-xl shadow-inner border border-gray-200">
            <h2 className="text-lg font-semibold mb-3">LP 수정하기</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  제목
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2 text-sm"
                  placeholder="제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  내용
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2 text-sm h-32"
                  placeholder="내용을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  썸네일 URL
                </label>
                <input
                  name="thumbnail"
                  value={form.thumbnail}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2 text-sm"
                  placeholder="https:// 로 시작하는 이미지 주소"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  태그 (쉼표로 구분)
                </label>
                <input
                  name="tagsText"
                  value={form.tagsText}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2 text-sm"
                  placeholder="예: 재즈, LP, 밤감성"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
