import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import GoogleCallbackPage from './pages/GoogleCallbackPage';

import RootLayout from './layout/root-layout'
import { ProtectedRoute } from './components/ProtectedRoute';

import { useExpiry} from './hooks/useExpiry';
import { useAuthStore } from "./store/authStore";
import { CreateLpPage } from './pages/CreateLpPage';
import { DetailedPage } from './pages/DetailedPage';

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
        path: "/myPage",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lps/new",
        element: (
          <ProtectedRoute>
            <CreateLpPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lps/:lpId",
        element: (
          <ProtectedRoute>
            <DetailedPage />
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

const queryClient = new QueryClient();

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
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* 애플리케이션 컴포넌트 페이지 컴포넌트 등등 */}
      <RouterProvider router={router} />
      <ReactQueryDevtools  
        initialIsOpen={false}               // 시작 시 패널 열림 여부
        buttonPosition="bottom-right"       // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'relative'
        position="bottom"                   // 'top' | 'bottom' | 'left' | 'right'
      />
    </QueryClientProvider>
  );
}

export default App;