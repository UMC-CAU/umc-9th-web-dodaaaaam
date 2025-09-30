import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import DarkModeButton from './components/DarkModeButton';

export default function App() {

  return (
    <main className="page">
      <header className="header">
        <DarkModeButton />
        <h1>UMC Study Plan</h1>
      </header>
      <section className="body">
        <section className="container">
          <TodoForm  />

          <section className="listContainer">
            <section className="todoList">
              <h3>해야 할 일</h3>
              <hr />
              <TodoList showDone={false}/>
            </section>

            <section className="todoList">
              <h3>해낸 일</h3>
              <hr />
              <TodoList showDone />
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}