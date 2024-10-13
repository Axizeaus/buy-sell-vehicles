import { useState } from "react";
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

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]); // Clear results if search term is empty
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchUsersByUsername(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  if (isLoading) return <strong>Loading users...</strong>;
  if (isError) return <strong>Error fetching users</strong>;

  const displayedUsers = searchResults.length > 0 ? searchResults : users;

  return (
    <div>
      <h1>All Users</h1>
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
      {isSearching && <p>Searching...</p>}
      <ul>
        {displayedUsers?.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
