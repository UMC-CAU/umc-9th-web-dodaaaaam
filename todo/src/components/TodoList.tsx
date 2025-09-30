import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type Props = {
  items: Todo[];
  actionLabel: "완료" | "삭제";
  onAction: (id: number) => void;
};

export default function TodoList({ items, actionLabel, onAction }: Props) {
  return (
    <ul className="todoList-item-list">
      {items.map((t) => (
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