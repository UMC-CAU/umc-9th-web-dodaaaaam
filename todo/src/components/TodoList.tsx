import { useTodo } from "../hooks/useTodo";

export default function TodoList({ showDone = false }: { showDone?: boolean }) {
  const { todos, completeTodo, deleteTodo } = useTodo();

  const list = todos.filter(t => t.isDone === showDone);
  const actionLabel = showDone ? "삭제" : "완료";
  const onAction = showDone ? deleteTodo : completeTodo;
  
  return (
    <ul className="todoList-item-list">
      {list.map((t) => (
        <li key={t.id} className="todoList-item">
          <span className={t.isDone ? "done" : ""}>{t.text}</span>
          <button onClick={() => onAction(t.id)}>{actionLabel}</button>
        </li>
      ))}
    </ul>
  );
}