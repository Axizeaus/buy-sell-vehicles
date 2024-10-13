import { useState } from "react";
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

interface AuthFormProps {
  title: string;
  description: string;
  onSubmit: (data: { username: string; password: string }) => void;
  buttonText: string;
  linkText: string;
  linkTo: string;
  errorMessage?: string; // New prop for error message
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  description,
  onSubmit,
  buttonText,
  linkText,
  linkTo,
  errorMessage, // Destructure the new prop
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });

    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            {title}
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            {description}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition duration-200 ease-in-out placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Password"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={!username || !password}
              className={`w-full p-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 transition duration-200`}
            >
              {buttonText}
            </Button>
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-center text-red-700">
                <p className="text-xs font-medium">{errorMessage}</p>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-gray-600 dark:text-gray-400">
            {linkText}{" "}
            <Link to={linkTo} className="text-blue-500 hover:underline">
              {linkText.includes("Log in") ? "Log in" : "Sign up"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
