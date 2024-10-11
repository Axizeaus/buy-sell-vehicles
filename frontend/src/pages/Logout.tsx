import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { logout } from "../api/users.js";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const [_, __, setToken, setUser] = useAuth();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setToken(null);
      setUser(null);
      navigate("/");
    },
    onError: (err: any) => alert("Failed to logout! err:" + err),
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md shadow-lg rounded-lg bg-white dark:bg-gray-800 p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Log Out
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Are you sure you want to log out?
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLogout}
            className="w-full p-2 text-white rounded-md bg-red-600 hover:bg-red-700 transition duration-200"
          >
            Log Out
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Want to stay?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Go back
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
