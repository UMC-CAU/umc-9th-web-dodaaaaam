import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import loginImage from "../assets/login-image.png";
import { useState } from "react";
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

type SignUpValues = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
};

const SignUpPage = () => {
  const [step, setStep] = useState(0);
  const methods = useForm<SignUpValues>({mode: "onChange",});
  const { getValues } = methods;
  const onSubmit = (data: SignUpValues) => console.log("회원가입:", data);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4">
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
              {step === 0 && (
                <div>
                  <InputField<SignUpValues> name="email" type="email" placeholder="이메일을 입력하세요." 
                    rules={{
                      required: "이메일은 필수입니다.",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "형식이 올바르지 않습니다." },
                    }}
                  />
                  <SubmitButton<SignUpValues>
                    variant="next"  
                    fields="email"
                    onSuccess={() => setStep(1)}
                  >
                    다음
                  </SubmitButton>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-2">
                  <p className="text-center text-zinc-300 text-m mb-4">
                    {getValues("email")}
                  </p>
                  <InputField<SignUpValues> name="password" type="password" placeholder="비밀번호를 입력하세요." withVisibilityToggle
                    rules={{
                      required: "비밀번호는 필수입니다.",
                      minLength: { value: 8, message: "8자 이상 입력하세요." },
                      maxLength: { value: 20, message: "20자 이하로 입력하세요." },
                      validate: (value) =>
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/.test(value) ||
                        "영문, 숫자, 특수문자를 모두 포함해야 합니다",
                    }}
                  />
                  <InputField<SignUpValues> name="confirmPassword" type="password" placeholder="비밀번호를 다시 한 번 입력하세요." withVisibilityToggle
                    rules={{
                      required: "비밀번호 확인이 필요합니다.",
                      validate: (value) =>
                        value === getValues("password") || "비밀번호가 일치하지 않습니다.", // ✅ 일치 검사
                    }}
                  />
                  <SubmitButton<SignUpValues>
                    variant="next"  
                    fields={["password", "confirmPassword"]}
                    onSuccess={() => setStep(2)}
                  >
                    다음
                  </SubmitButton>
                </div>
              )}
              {step === 2 && (
                <div>
                  <InputField<SignUpValues> name="nickname" type="nickname" placeholder="닉네임을 입력하세요." 
                    rules={{
                      required: "닉네임은 필수입니다.",
                      maxLength: { value: 10, message: "10자 이하로 입력하세요." }
                    }}
                  />
                  <SubmitButton<SignUpValues> variant="submit">가입하기</SubmitButton>
                </div>
              )}
            </form>
          </FormProvider>

          {/* 하단 링크 */}
          <div className="flex items-center justify-between mt-5 text-sm">
            <Link to="/login" className="text-zinc-400 hover:text-zinc-200 cursor-pointer">
              이미 계정이 있으신가요? 
            </Link>
            <Link to="/" className="text-indigo-300 hover:text-indigo-200">
              홈으로
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUpPage;