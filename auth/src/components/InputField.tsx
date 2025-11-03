import { useFormContext, get, type FieldValues, type FieldError, } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { InputFieldProps } from "../types/InputFieldProps";

export function InputField<T extends FieldValues>({
  name, type = "text", placeholder, rules, withVisibilityToggle = false,
}: InputFieldProps<T>) {
  const { register, formState: { errors } } = useFormContext<T>();
  const fieldErr = get(errors, name) as FieldError | undefined;
  const err = fieldErr?.message as string | undefined;

  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const effectiveType = withVisibilityToggle && isPassword ? (visible ? "text" : "password") : type;

  return (
    <div className={`flex flex-col space-y-1.5`}>
      <div className="relative">
        <input
          type={effectiveType}
          placeholder={placeholder}
          {...register(name, rules)}
          className={`w-full p-3 rounded-lg bg-zinc-900 text-zinc-100 placeholder-zinc-400 border focus:outline-none 
            ${err ? "border-red-500" : "border-zinc-700 focus:ring-2 focus:ring-indigo-400/70"}`}
          aria-invalid={!!err}
        />

        {withVisibilityToggle && isPassword && (
          <button
            type="button"
            onClick={() => setVisible(v => !v)}
            className="absolute inset-y-0 z-10 right-4 flex items-center text-zinc-400 hover:text-zinc-200"
            aria-pressed={visible}
            title={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            <Eye className={visible ? "hidden" : ""} size={18} />
            <EyeOff className={!visible ? "hidden" : ""} size={18} />
          </button>
        )}
      </div>
      {err && <p className="text-red-400 text-xs px-1">{err}</p>}
    </div>
  );
}
