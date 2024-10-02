import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";

import Signup from "./pages/Signup";
import { Login } from "./pages/Login";
import Placeholder from "./pages/PlaceHolder";

const queryClient = new QueryClient({});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Placeholder />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
