import { useTodo } from "../hooks/useTodo";

export default function TodoForm() {
  const { input, setInput, addTodo } = useTodo();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();    // 새로 고침 막기 
    addTodo();            // 부모에서 넘겨준 addTodo 함수 실행 
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="inputBox"
        placeholder="할 일을 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="addButton">추가</button>
    </form>
  );
}
