import { useState, useMemo, useCallback, type ReactNode } from "react";
import { TodoContext, type TodoContextType } from "./TodoContext";
import type { Todo } from "../types/todo";

// Provider 컴포넌트
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setTodos(prev => [{ id: Date.now(), text, isDone: false }, ...prev]);
    setInput("");
  }, [input]);

  const completeTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, isDone: !t.isDone } : t)));
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  // value는 메모이즈해서 불필요 렌더 줄이기
  const value = useMemo<TodoContextType>(
    () => ({ input, todos, setInput, addTodo, completeTodo, deleteTodo }),
    [input, todos, addTodo, completeTodo, deleteTodo]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
