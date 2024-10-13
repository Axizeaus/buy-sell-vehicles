import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, searchUsersByUsername } from "../api/users.js";
import { Link } from "react-router-dom";
import { User } from "@/types.js";

export default function AllUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const handleSearch = async (term: string) => {
    if (term.trim() === "") {
      setSearchResults([]); // Clear results if search term is empty
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchUsersByUsername(term);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Effect to handle real-time search
  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  if (isLoading) return <strong>Loading users...</strong>;
  if (isError) return <strong>Error fetching users</strong>;

  const displayedUsers = searchResults.length > 0 ? searchResults : users;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        All Users
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded p-2 mr-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          onClick={() => handleSearch(searchTerm)} // Keep the button functionality
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
        >
          Search
        </button>
      </div>
      {isSearching && (
        <p className="text-gray-500 dark:text-gray-400">Searching...</p>
      )}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {displayedUsers?.map((user, index) => (
          <li
            key={user.id}
            className={`py-2 px-4 ${
              index % 2 === 0
                ? "bg-gray-100 dark:bg-gray-700"
                : "bg-white dark:bg-gray-800"
            } transition-colors duration-200`}
          >
            <Link
              to={`/user/${user.id}`}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
