import type { FieldValues, Path, RegisterOptions } from 'react-hook-form'

export type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;      // register에 넘길 필드 이름 
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];  // text, email, password, ... 중 하나 
  placeholder?: string;  
  rules?: RegisterOptions<T, Path<T>>;
  withVisibilityToggle?: boolean;
};