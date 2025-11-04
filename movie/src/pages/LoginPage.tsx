import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import loginImage from "../assets/login-image.png";
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

type LoginValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const methods = useForm<LoginValues>({ mode: "onChange" });
  const onSubmit = (d: LoginValues) => console.log("로그인:", d);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4 ">
      <div className="relative w-full max-w-md">
        <BackButton />
        <img
          src={loginImage}
          alt="Login"
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ring-4 ring-zinc-900 shadow-lg object-cover"
        />

        <div className="bg-zinc-800/70 backdrop-blur-sm border border-zinc-700 rounded-2xl shadow-2xl px-6 pt-22 pb-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              {/* 이메일 */}
              <InputField<LoginValues> name="email" type="email" placeholder="이메일을 입력하세요." 
                rules={{
                  required: "이메일은 필수입니다.",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "형식이 올바르지 않습니다." },
                }}
              />
              {/* 비밀번호 */}
              <InputField<LoginValues> name="password" type="password" placeholder="비밀번호를 입력하세요." withVisibilityToggle
                rules={{
                  required: "비밀번호는 필수입니다.",
                  minLength: { value: 8, message: "8자 이상 입력하세요." },
                  maxLength: { value: 20, message: "20자 이하로 입력하세요." },
                  validate: (value) =>
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/.test(value) ||
                    "영문, 숫자, 특수문자를 모두 포함해야 합니다",
                }}
              />
              {/* 제출 버튼 */}
              <SubmitButton<LoginValues> variant="submit">로그인</SubmitButton>
            </form>
          </FormProvider>

          {/* 하단 링크 */}
          <div className="flex items-center justify-between mt-5 text-sm">
            <Link to="/findIdPW" className="text-zinc-400 hover:text-zinc-200 cursor-pointer">
              아이디/비밀번호 찾기
            </Link>
            <Link to="/signUp" className="text-indigo-300 hover:text-indigo-200">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

};
export default LoginPage;