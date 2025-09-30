type Props = {
  value: string;
  onChange: (v: string) => void;   //입력값이 바뀔 때 실행할 함수
  onSubmit: () => void;            //폼이 제출될 때 실행할 함수
};

export default function TodoForm({ value, onChange, onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();    // 새로 고침 막기 
    onSubmit();            // 부모에서 넘겨준 addTodo 함수 실행 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="inputBox"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit" className="addButton">
        추가
      </button>
    </form>
  );
}
