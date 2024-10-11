import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { ThemeProvider } from "./components/themeProvider";

import Signup from "./pages/Signup";
import { Login } from "./pages/Login";
import MainPage from "./pages/MainPage";
import Layout from "./components/Layout";
import CreatePost from "./components/CreatePost";
import PostDetail from "./components/PostDetail.tsx";
import { LogOut } from "lucide-react";
import Logout from "./pages/Logout.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "posts",
        children: [
          {
            path: "create",
            element: <CreatePost />,
          },
          // {
          //   path: ":id/edit",
          //   element: <EditPost />,
          // },
          // {
          //   path: ":id/delete",
          //   element: <DeletePost />,
          // },
          {
            path: ":id",
            element: <PostDetail />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
