import { useParams } from "react-router-dom";
import { useLpQuery } from "../hooks/useLpQuery";
import { Heart } from "lucide-react";
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
          w-full max-w-2xl
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

        <div className="flex justify-end gap-3 mb-1 mt-3">
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

        <h1 className="text-2xl font-bold mb-3">{LpData.title}</h1>
        <img
          src={LpData.thumbnail}
          alt={LpData.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {LpData.content}
        </p>

        <p className="text-xs mb-2">
          {LpData.tags?.map((tag) => `#${tag.name}`).join(" ")}
        </p>
        <p className="flex items-center gap-1 text-rose-400 text-sm">
          <Heart size={14} fill="currentColor" />
            {LpData.likes?.length ?? 0}
        </p>
      </div>
    </div>
  );
}
