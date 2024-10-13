import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/users.js";
import { Link } from "react-router-dom";

import { User } from "@/types.js";

export default function AllUsers() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) return <strong>Loading users...</strong>;
  if (isError) return <strong>Error fetching users</strong>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
