import { Link, useParams } from "react-router-dom";
import { useLpQuery } from "../../hooks/useLpQuery";
import { Heart, MessageSquare  } from "lucide-react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export function DetailedPage(){
  const { lpId } = useParams<{ lpId: string }>();
  const id = Number(lpId);

  const { data, isError, isPending } = useLpQuery(id);

  if (isPending) {
    return <div className="text-center mt-10">Loading...</div>;
  } 

  if (isError || !data) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error: 상세 정보를 불러오는 데 실패했습니다.
      </div>
    );
  }

  const LpData = data.data;
  
  return(
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
          <p className="text-gray-800 mb-2">
            {LpData.author.name}
          </p>
          <p className="text-gray-800 mb-2">
            {new Date(LpData.createdAt).toLocaleDateString()}
          </p>
        </header>
        <hr className="border border-gray-300"/>

        {/* 제목 + 아이콘 줄 */}
        <div className="flex items-center justify-between mt-3 mb-3">
          <h1 className="text-2xl font-bold flex-1 pr-4 break-words">
            {LpData.title}
          </h1>

          {/* 아이콘 */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              className="text-gray-500 hover:text-emerald-600 transition"
              onClick={() => console.log("수정 클릭")}
            >
              <FiEdit2 size={20} />
            </button>
            <button
              className="text-gray-500 hover:text-red-500 transition"
              onClick={() => console.log("삭제 클릭")}
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
              className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500 text-white text-xs"
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
      </div>
    </div>
  );
}
