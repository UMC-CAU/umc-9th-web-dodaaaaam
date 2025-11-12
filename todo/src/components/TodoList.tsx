import { useTodo } from "../hooks/useTodo";
import TodoItem from "./TodoItem";

export default function TodoList({ showDone = false }: { showDone?: boolean }) {
  const { todos, completeTodo, deleteTodo } = useTodo();

  const list = todos.filter(t => t.isDone === showDone);
  const actionLabel = showDone ? "삭제" : "완료";
  const onAction = showDone ? deleteTodo : completeTodo;
  
  return (
    <ul className="todoList-item-list">
      {list.map((t) => (
        <TodoItem
            key={t.id}
            id={t.id}
            text={t.text}
            actionLabel={actionLabel}
            onAction={onAction}
          />
      ))}
    </ul>
  );
}