import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PremiumPage from './pages/PremiumPage';
import RootLayout from './layout/root-layout'
import { ProtectedRoute } from './components/ProtectedRoute';
//import { useAuthStore } from './store/authStore';
import { useExpiry} from './hooks/useExpiry';
import { useEffect } from 'react';
import { useAuthStore } from "./store/authStore";
import GoogleCallbackPage from './pages/GoogleCallbackPage';

// 경로(path)와 보여줄 화면(element)를 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/premium",
        element: (
          <ProtectedRoute>
            <PremiumPage />
          </ProtectedRoute>
        ),
      },
    ]
  },
  {
    path: "/signin",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
  {
    path: "/v1/auth/google/callback",
    element: <GoogleCallbackPage />,
  }
]);

function App() {
  const { setToken } = useAuthStore.getState();
  const savedAT = localStorage.getItem("accessToken");
  const savedRT = localStorage.getItem("refreshToken");
  const savedExpStr = localStorage.getItem("accessExp");
  const savedExp = savedExpStr ? Number(savedExpStr) : null;

  // 로컬 AccessToken 복원
  useEffect(() => {
    if (!savedAT || !savedRT) {
      useAuthStore.setState({ status: "unauthenticated" });
      return; 
    }
    setToken({ accessToken: savedAT, refreshToken: savedRT, accessExp: savedExp });
    useAuthStore.setState({ status: "authenticated" });
  }, []);

  useExpiry();
  
  return <RouterProvider router={router} />
}

export default App;