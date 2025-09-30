import {useState} from "react";
import "./App.css";
import type { Todo } from "./types/todo";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  /** 할 일 추가 */
  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [{ id : Date.now(), text, isDone: false}, ... prev]);
    setInput("");
  };

  /** 할 일 완료 */
  const completeTodo = (id: number) => {
    setTodos((prev) => 
      prev.map((t) =>
        t.id === id ? { ...t, isDone: !t.isDone } : t
      )
    );
  };

  /** 해낸 일 삭제 */
  const deleteTodo = (id:number) => {
    setTodos((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <main className="page">
      <header className="header">
        <h1>UMC Study Plan</h1>
      </header>
      <section className="body">
        <section className="container">
          <TodoForm
            value={input}
            onChange={setInput}
            onSubmit={addTodo}
          />

          <section className="listContainer">
            <section className="todoList">
              <h3>해야 할 일</h3>
              <hr />
              <TodoList
                items={todos.filter((t) => !t.isDone)}
                actionLabel="완료"
                onAction={completeTodo}
              />
            </section>
            <section className="todoList">
              <h3>해낸 일</h3>
              <hr />
              <TodoList
                items={todos.filter((t) => t.isDone)}
                actionLabel="삭제"
                onAction={deleteTodo}
              />
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}