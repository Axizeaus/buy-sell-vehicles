import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/users.js";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();

  console.log(userId);

  const userQuery = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserInfo(userId!),
  });

  const { data: user, isError, isLoading } = userQuery;

  if (isLoading) return <strong>Loading...</strong>;
  if (isError) return <strong>Error fetching user info</strong>;

  return (
    <div>
      <h1>User Profile</h1>
      <strong>{user?.username ?? userId}</strong>{" "}
    </div>
  );
}
