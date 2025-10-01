interface Todo{
  id: string;
  content: string;
  completed: boolean;
}

const input = document.querySelector<HTMLInputElement>('.study-input');
const todoList = document.getElementById('todo-list') as HTMLUListElement | null;
const doneList = document.getElementById('done-list') as HTMLUListElement | null;

if (!input || !todoList || !doneList ) {
  throw new Error('필수 DOM 요소를 찾지 못했습니다.');
}

/* 상태 저장 */
const STORAGE_KEY = 'umc-todos-v1';
let todos: Todo[] = load();

function save(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return (parsed as Todo[]).map((t) => ({
      id: String(t.id ?? uid()),
      content: String(t.content ?? ''),
      completed: Boolean(t.completed),
    }));
  } catch {
    return [];
  }
}

/* 고유 ID 생성 */
function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/** 렌더링 */
function renderAll(): void {
  if (todoList === null || doneList === null) return;
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  for (const t of todos) {
    const li = createItemElement(t);
    (t.completed ? doneList : todoList).appendChild(li);
  }
}

function createItemElement(todo: Todo): HTMLLIElement {
  const li = document.createElement('li');
  li.classList.add('item');

  const span = document.createElement('span');
  span.textContent = todo.content;

  const button = document.createElement('button');
  button.classList.add('complete-btn');

  if (todo.completed) {
    button.textContent = '삭제';
    button.addEventListener('click', () => {
      todos = todos.filter((x) => x.id !== todo.id);
      save();
      renderAll();
    });
  } else {
    button.textContent = '완료';
    button.addEventListener('click', () => {
      const idx = todos.findIndex((x) => x.id === todo.id);
      if (idx < 0) return;

      const item = todos[idx];
      if(!item) return;

      item.completed = true;
      save;
      renderAll();
    });
  }

  li.appendChild(span);
  li.appendChild(button);
  return li;
}

/** 입력 */
input.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const content = input.value.trim();
    if (!content) return;

    const newTodo: Todo = { id: uid(), content, completed: false };
    todos.push(newTodo);
    save();

    const li = createItemElement(newTodo);
    todoList.appendChild(li);
    input.value = '';
  }
});