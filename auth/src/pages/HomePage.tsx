import { Link } from "react-router-dom";

const dummyWebtoons = [
  { id: 1, title: "달빛 탐정", author: "홍길동", thumbnail: "https://picsum.photos/300/400?random=1" },
  { id: 2, title: "사신의 계약", author: "김하늘", thumbnail: "https://picsum.photos/300/400?random=2" },
  { id: 3, title: "초능력 고등학교", author: "박지훈", thumbnail: "https://picsum.photos/300/400?random=3" },
  { id: 4, title: "마법사의 일상", author: "이서연", thumbnail: "https://picsum.photos/300/400?random=4" },
  { id: 5, title: "시간 여행자", author: "최윤아", thumbnail: "https://picsum.photos/300/400?random=5" },
  { id: 6, title: "별빛소년", author: "이정훈", thumbnail: "https://picsum.photos/300/400?random=6" },
  { id: 7, title: "괴도 루시퍼", author: "정민우", thumbnail: "https://picsum.photos/300/400?random=7" },
  { id: 8, title: "그림자의 주인", author: "한소라", thumbnail: "https://picsum.photos/300/400?random=8" },
  { id: 9, title: "이세계 아카데미", author: "김하람", thumbnail: "https://picsum.photos/300/400?random=9" },
  { id: 10, title: "좀비시티", author: "류현우", thumbnail: "https://picsum.photos/300/400?random=10" },
];

const HomePage = () => {
  return (
    <div className="min-h-dvh bg-white text-zinc-900">
      {/* 웹툰 리스트 (그리드) */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-6xl py-10 px-5">
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
            {dummyWebtoons.map((toon) => (
              <Link
                key={toon.id}
                to={`/webtoon/${toon.id}`}
                className="group block w-full max-w-[200px]"
              >
                {/* 썸네일 */}
                <div className="overflow-hidden rounded-lg shadow-md">
                  <img
                    src={toon.thumbnail}
                    alt={toon.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* 제목 + 작가 */}
                <div className="mt-2 text-center">
                  <h3 className="text-base font-semibold truncate group-hover:text-emerald-500 transition-colors">
                    {toon.title}
                  </h3>
                  <p className="text-sm text-zinc-500">{toon.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
