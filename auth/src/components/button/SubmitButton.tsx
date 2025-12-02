import { useFormContext, useFormState, type FieldValues, type Path, } from "react-hook-form";
import type { SubmitButtonProps } from "../../types/form-controls";

export function SubmitButton<T extends FieldValues>(props: SubmitButtonProps<T>) {
  const { control, trigger } = useFormContext<T>();
  const { isDirty, isValid, isSubmitting } = useFormState({ control });

  const commonClass = `w-full mt-2 text-white font-semibold py-3 rounded-lg transition ${
    isSubmitting
      ? "bg-zinc-600 opacity-60 cursor-not-allowed"
      : "bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600"
  }`;

  if (props.variant === "submit") {
    const { children } = props;
    const disabled = !isDirty || !isValid || isSubmitting;

    return (
      <button type="submit" disabled={disabled} className={`${commonClass}`}>
        { children }
      </button>
    );
  }

  // variant === "next"
  const { children, fields, onSuccess } = props;
  const disabled = isSubmitting;

  const handleNext = async () => {
    const fieldList: Path<T>[] = Array.isArray(fields) ? fields : [fields];
    const ok = await trigger(fieldList, { shouldFocus: true });   // trigger: RHF의 필드 검증 함수
    if (ok) onSuccess();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleNext}
      className={`${commonClass}`}
    >
      { children } 
    </button>
  );
}
