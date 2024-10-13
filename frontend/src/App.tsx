import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { ThemeProvider } from "./components/themeProvider";

import Signup from "./pages/Signup";
import { Login } from "./pages/Login";
import MainPage from "./pages/MainPage";
import Layout from "./components/Layout";
import CreatePost from "./components/CreatePost";
import PostDetail from "./pages/PostDetailPage.tsx";

import Logout from "./pages/Logout.tsx";
import EditPost from "./components/EditPost.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import EditUser from "./components/EditUser.tsx";
import DeleteUser from "./components/DeleteUser.tsx";
import AllUsers from "./components/AllUsers.tsx";

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
          {
            path: ":id/edit",
            element: <EditPost />,
          },
          {
            path: ":id",
            element: <PostDetail />,
          },
        ],
      },
      {
        path: "user",
        children: [
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: ":userId",
            element: <UserProfile />,
          },
          {
            path: ":userId/edit",
            element: <EditUser />,
          },
          {
            path: ":userId/delete",
            element: <DeleteUser />,
          },
          {
            path: "all",
            element: <AllUsers />,
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
