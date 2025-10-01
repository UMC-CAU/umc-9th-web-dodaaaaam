import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage"

// 2. 경로(path)와 보여줄 화면(element)를 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <MoviesPage />
  }
]);

// 3. RouterProvider로 router 전달
function App() {
  return <RouterProvider router={router} />
}

export default App;