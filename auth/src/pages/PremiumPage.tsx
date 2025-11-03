// src/pages/PremiumPage.tsx
import { Crown } from "lucide-react";

const PremiumPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 안내 배너(프리미엄 톤) */}
      <section className="mx-auto mt-8 w-full max-w-6xl px-6">
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <Crown className="text-amber-500" />
          <p className="text-sm text-amber-900">
            프리미엄 전용 작품을 즐겨보세요. 광고 없이 고화질로 감상할 수 있어요.
          </p>
        </div>
      </section>
      <div className="mt-12 flex justify-center">
          <button className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-500 transition-colors">
            프리미엄 멤버십 시작하기
          </button>
        </div>
    </div>
  );
};

export default PremiumPage;
