import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo는 반드시 <TodoProvider> 내부에서 사용해야 합니다.");
  return ctx;
};
