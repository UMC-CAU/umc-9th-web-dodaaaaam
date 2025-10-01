import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MoviesPage from './pages/MoviesPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFoundPage';
import RootLayout from './layout/root-layout';

// 2. 경로(path)와 보여줄 화면(element)를 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/movies/:category",
        element: <MoviesPage />,
      },
    ],
  },
]);

// 3. RouterProvider로 router 전달
function App() {
  return <RouterProvider router={router} />
}

export default App;