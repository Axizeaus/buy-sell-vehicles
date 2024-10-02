import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/users.js";

export default function User({ id }: { id: string }) {
  const userInfoQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserInfo(id),
  });
  const userInfo = userInfoQuery.data ?? {};
  console.log(userInfoQuery.data);
  return <strong>{userInfo?.username ?? id}</strong>;
}
