import { Link } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import User from "./User.tsx";
import ModeToggle from "./ModeToggle"; // Ensure you import the ModeToggle component

interface CustomJwtPayload extends JwtPayload {
  sub: string;
}

export function Header() {
  const [token, setToken] = useAuth();

  if (token) {
    const { sub } = jwtDecode<CustomJwtPayload>(token);
    return (
      <header className="flex justify-between items-center p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold">Welcome to Our App</h1>
        <div className="flex items-center">
          <ModeToggle />
          <span className="mr-4">
            Logged in as <User id={sub} />
          </span>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={() => setToken(null)}
          >
            Logout
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold">Welcome to Our App</h1>
      <nav className="flex items-center">
        <Link to="/login" className="mr-4 hover:underline">
          Log In
        </Link>
        <span className="text-gray-400">|</span>
        <Link to="/signup" className="ml-4 hover:underline">
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
