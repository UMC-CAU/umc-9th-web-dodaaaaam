type Props = {
  id: number;
  text: string;
  actionLabel: string;
  onAction: (id: number) => void;
};

export default function TodoItem({ id, text, actionLabel, onAction }: Props) {
  return (
    <li className="todoList-item">
      <span className="todoText">{text}</span>
      <button
        type="button"
        className={actionLabel === "완료" ? "completeButton todoBtn" : "deleteButton todoBtn"}
        onClick={() => onAction(id)}
      >
        {actionLabel}
      </button>
    </li>
  );
}
