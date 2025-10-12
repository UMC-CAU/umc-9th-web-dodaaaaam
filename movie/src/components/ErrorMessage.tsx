type Props = {
  message: string;     // 에러 메세지 
};

export default function ErrorMessage({ message }: Props) {
  return (
    <div
      className={`text-center text-red-600 font-semibold my-4`}
      role="alert"
    >
      {message}
    </div>
  );
}