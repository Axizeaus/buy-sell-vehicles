import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/users.js";
import { getPostByUser } from "../api/posts.js";
import { useParams } from "react-router-dom";
import PostList from "@/components/PostList.js";
import { useState } from "react";

export default function UserProfile() {
  const { userId } = useParams();

  console.log(userId);

  const userQuery = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserInfo(userId!),
  });

  const postsQuery = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPostByUser(userId!),
    enabled: !!userId,
  });

  const { data: user, isError: userError, isLoading: userLoading } = userQuery;
  const {
    data: posts,
    isError: postsError,
    isLoading: postsLoading,
  } = postsQuery;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Set the number of posts per page

  // Calculate total posts and slice the posts for the current page
  const totalPosts = posts?.length || 0;
  const paginatedPosts =
    posts?.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage
    ) || [];

  const onNextPage = () => {
    if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (userLoading) return <strong>Loading user info...</strong>;
  if (userError) return <strong>Error fetching user info</strong>;

  if (postsLoading) return <strong>Loading posts...</strong>;
  if (postsError) return <strong>Error fetching posts</strong>;

  console.log(posts);

  return (
    <div>
      <h1>User Profile</h1>
      <strong>{user?.username ?? userId}</strong>
      <h2>Posts</h2>
      <PostList
        posts={paginatedPosts}
        totalPosts={totalPosts}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={postsPerPage}
      />
    </div>
  );
}
