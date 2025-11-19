import { useEffect, useState } from "react";
import { FiSettings, FiX } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { useUpdateProfileMutation } from "../hooks/useAuthMutation"
import loginImage from "../assets/login-image.png";

const MyPage = () => {
  const authUser = useAuthStore((s) => s.user);
  const { data: me, isLoading, isError } = useAuthQuery();
  const { mutate: updateProfile } = useUpdateProfileMutation();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });

  // me 불러오면 form에 기본값 세팅
  useEffect(() => {
    if (!me) return;
    setForm({
      name: me.name ?? "",
      email: me.email ?? "",
      bio: me.bio ?? "",
      avatar: me.avatar ?? "",
    });
  }, [me]);

  if (!authUser) return null; 
  if (isLoading) return <div className="p-6">내 정보 불러오는 중...</div>;
  if (isError || !me) return <div className="p-6">프로필 정보를 불러오지 못했어요 😢</div>;

  const openSettings = () => {
    setForm({
      name: me.name ?? "",
      email: me.email ?? "",
      bio: me.bio ?? "",
      avatar: me.avatar ?? "",
    });
    setIsSettingsOpen(true);
  };

  const closeSettings = () => setIsSettingsOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // 수정 요청 보낼 payload
    const payload = {
      name: form.name,
      bio: form.bio,      
      avatar: form.avatar,
    };

    updateProfile(payload, {
      onSuccess: () => {
        setIsSettingsOpen(false);
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* 우측 상단 설정 버튼 */}
      <button
        onClick={openSettings}
        className="
          fixed top-4 right-4
          rounded-full bg-white shadow-md
          p-2
          hover:bg-gray-100
          transition
        "
        aria-label="프로필 설정"
      >
        <FiSettings className="w-5 h-5 text-gray-700" />
      </button>

      {/* 메인 콘텐츠 */}
      <div className="flex items-start justify-center pt-20 px-4 pb-10">
        <div
          className="
            w-full max-w-3xl
            bg-white
            rounded-3xl
            shadow-xl
            p-8
            border border-gray-100
            flex flex-col md:flex-row gap-8
          "
        >
          {/* 프로필 이미지 영역 */}
          <div className="flex flex-col items-center gap-4 md:w-1/3">
            {me.avatar ? (
              <img
                src={me.avatar}
                alt={me.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-emerald-200 shadow-md"
              />
            ) : (
              <img
                src={loginImage}
                alt="Login"
                className="w-24 h-24 rounded-full shadow-lg object-cover"
              />
            )}
            <button
              onClick={openSettings}
              className="
                inline-flex items-center gap-2
                px-3 py-1.5
                text-xs md:text-sm
                rounded-full
                border border-emerald-200
                text-emerald-700
                bg-emerald-50
                hover:bg-emerald-100
                transition
              "
            >
              <FiSettings className="w-4 h-4" />
              프로필 편집
            </button>
          </div>

          {/* 텍스트 정보 영역 */}
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {me.name}
              </p>
            </div>
            {me.bio && (
              <div>
                <p className="text-base text-gray-800">
                  {me.bio}
                </p>
              </div>
            )}
            <div>
              <p className="text-base text-gray-800">
                {me.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 설정 모달 */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className="
              w-full max-w-md
              bg-white
              rounded-2xl
              shadow-2xl
              p-6
              mx-4
            "
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                프로필 설정
              </h2>
              <button
                onClick={closeSettings}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="
                    w-full rounded-lg border border-gray-300
                    px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  "
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="
                    w-full rounded-lg border border-gray-300
                    px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  "
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  bio
                </label>
                <input
                  name="bio"
                  type="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="
                    w-full rounded-lg border border-gray-300
                    px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  "
                  placeholder="bio를 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  아바타 이미지 URL
                </label>
                <input
                  name="avatar"
                  value={form.avatar}
                  onChange={handleChange}
                  className="
                    w-full rounded-lg border border-gray-300
                    px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  "
                  placeholder="https://로 시작하는 이미지 주소"
                />
                <p className="mt-1 text-xs text-gray-500">
                  이미지 주소를 붙여넣으면 프로필 사진으로 사용돼요.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeSettings}
                  className="
                    px-4 py-2 text-sm rounded-lg
                    border border-gray-200 text-gray-600
                    hover:bg-gray-50
                  "
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="
                    px-4 py-2 text-sm rounded-lg
                    bg-emerald-500 text-white
                    hover:bg-emerald-600
                    transition
                  "
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
