import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signup } from "@/api/users";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate("/login"),
    onError: () => alert("failed to sign up!"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Back to main page
            </Link>
            <div className="mb-4">
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
            <div className="mb-4">
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

            <Button
              type="submit"
              disabled={!username || !password || signupMutation.isPending}
              className={`w-full p-2 text-white rounded-md ${
                signupMutation.isPending
                  ? "bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition duration-200`}
            >
              {signupMutation.isPending ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
