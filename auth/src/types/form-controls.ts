import type { FieldValues, Path } from 'react-hook-form'

type BaseProps = {
  children: React.ReactNode;
}

type NextVariantProps<T extends FieldValues> = BaseProps & {
  variant: "next";
  fields: Path<T> | Path<T>[];
  onSuccess: () => void;
};

type SubmitVariantProps = BaseProps & {
  variant: "submit";
};

export type SubmitButtonProps<T extends FieldValues> =
  | NextVariantProps<T>
  | SubmitVariantProps;