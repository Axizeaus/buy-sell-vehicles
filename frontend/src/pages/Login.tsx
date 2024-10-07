import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../api/users.js";
import { useAuth } from "../contexts/AuthContext.jsx";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [, setToken] = useAuth();

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      if (data.token) {
        setToken(data.token);
      }

      navigate("/");
    },
    onError: () => alert("failed to login!"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            Log In
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            Access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Back to main page
            </Link>
            <hr className="my-4" />
            <div>
              <input
                type="text"
                name="create-username"
                id="create-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition duration-200 ease-in-out placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="create-password"
                id="create-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition duration-200 ease-in-out placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Password"
                required
              />
            </div>
            <input
              type="submit"
              value={loginMutation.isPending ? "Logging in..." : "Log In"}
              disabled={!username || !password || loginMutation.isPending}
              className={`w-full p-3 text-white rounded-md ${
                loginMutation.isPending
                  ? "bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition duration-200`}
            />
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
