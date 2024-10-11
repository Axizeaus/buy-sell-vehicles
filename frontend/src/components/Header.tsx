import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import ModeToggle from "./ModeToggle";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [token, user] = useAuth();
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-gray-100">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Buy and Sell, Vehicles
      </h1>
      <div className="flex items-center">
        <ModeToggle />
        {token ? (
          <>
            <span className="mr-4 border-solid border-green-500 border-y-2 mx-4">
              {user?.username}
            </span>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
              <Link
                to="/logout"
                className="flex items-center justify-center w-full h-full"
              >
                Logout
              </Link>
            </button>
          </>
        ) : (
          <nav className="flex items-center">
            <Link to="/login" className="mr-4 hover:underline">
              Log In
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/signup" className="ml-4 hover:underline">
              Sign Up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
