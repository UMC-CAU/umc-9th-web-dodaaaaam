import { createContext } from "react";
import type { Todo } from "../types/todo";

// Context가 담을 값의 타입
export interface TodoContextType {
  input: string;
  todos: Todo[];
  setInput: (v: string) => void;
  addTodo: () => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

// 초기값은 undefined로 (Provider 누락 시 오류를 잡기 쉬움)
export const TodoContext = createContext<TodoContextType | undefined>(undefined);