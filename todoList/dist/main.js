"use strict";
const input = document.querySelector('.study-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
if (!input || !todoList || !doneList) {
    throw new Error('필수 DOM 요소를 찾지 못했습니다.');
}
const STORAGE_KEY = 'umc-todos-v1';
let todos = load();
function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed))
            return [];
        return parsed.map((t) => {
            var _a, _b;
            return ({
                id: String((_a = t.id) !== null && _a !== void 0 ? _a : uid()),
                content: String((_b = t.content) !== null && _b !== void 0 ? _b : ''),
                completed: Boolean(t.completed),
            });
        });
    }
    catch (_a) {
        return [];
    }
}
function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function renderAll() {
    if (todoList === null || doneList === null)
        return;
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    for (const t of todos) {
        const li = createItemElement(t);
        (t.completed ? doneList : todoList).appendChild(li);
    }
}
function createItemElement(todo) {
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
    }
    else {
        button.textContent = '완료';
        button.addEventListener('click', () => {
            const idx = todos.findIndex((x) => x.id === todo.id);
            if (idx < 0)
                return;
            const item = todos[idx];
            if (!item)
                return;
            item.completed = true;
            save;
            renderAll();
        });
    }
    li.appendChild(span);
    li.appendChild(button);
    return li;
}
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const content = input.value.trim();
        if (!content)
            return;
        const newTodo = { id: uid(), content, completed: false };
        todos.push(newTodo);
        save();
        const li = createItemElement(newTodo);
        todoList.appendChild(li);
        input.value = '';
    }
});
