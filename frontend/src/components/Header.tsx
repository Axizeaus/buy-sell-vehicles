import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import ModeToggle from "./ModeToggle";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.svg";

export function Header() {
  const [token, user] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userProfileLink = `/user/${user?.id}`;
  const allUsersLink = "/user/all";

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-gray-100">
      <Link to="/" className="flex justify-center items-center">
        <img src={logo} alt="Logo" className="h-12 mr-2" />
        <h1>Buy & sell, vehicles</h1>
      </Link>

      <div className="hidden md:flex items-center">
        <ModeToggle />
        {token ? (
          <>
            <Link
              to={userProfileLink}
              className="mr-4 border-solid border-green-500 border-y-2 mx-4"
            >
              {user?.username}
            </Link>
            <Link to={allUsersLink} className="mr-4 hover:underline">
              All Users
            </Link>
            <Link
              to="/logout"
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Logout
            </Link>
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
      <div className="md:hidden flex items-center">
        <ModeToggle />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-4 focus:outline-none"
        >
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-full bg-gray-100 dark:bg-gray-900 shadow-lg md:hidden">
          <div className="flex flex-col p-4">
            <ModeToggle />
            {token ? (
              <>
                <Link
                  to={userProfileLink}
                  className="my-2 hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user?.username}
                </Link>
                <Link
                  to={allUsersLink}
                  className="my-2 hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Users
                </Link>
                <Link
                  to="/logout"
                  className="my-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Logout
                </Link>
              </>
            ) : (
              <nav className="flex flex-col">
                <Link
                  to="/login"
                  className="my-2 hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="my-2 hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </nav>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
