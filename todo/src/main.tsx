import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import './App.css'; 
import { TodoProvider } from "./context/TodoProvider";
import ThemeProvider from "./context/ThemeProvider"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeProvider>
  </StrictMode>,
)
