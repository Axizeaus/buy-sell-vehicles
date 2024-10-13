import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/users.js";
import { getPostByUser } from "../api/posts.js";
import { useParams, Link } from "react-router-dom";
import PostList from "@/components/PostList.js";
import { useState } from "react";

export default function UserProfile() {
  const { userId } = useParams();

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

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

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

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-gray-300">
        <h1>User Profile</h1>
        <strong>{user?.username}</strong>
        <div className="mt-4">
          <h2>Location</h2>
          <p>
            {user?.location?.city}, {user?.location?.state}
          </p>
        </div>
        <div className="mt-4">
          <h2>Contact Info</h2>
          <p>Email: {user?.contactInfo?.email}</p>
          <p>Phone: {user?.contactInfo?.phone}</p>
        </div>
        <div className="mt-4">
          <h2>Miscellaneous</h2>
          <p>{user?.miscellaneous}</p>
        </div>
        <Link
          to={`/user/${userId}/edit`}
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
        >
          Edit User
        </Link>
        <Link
          to={`/user/${userId}/delete`}
          className="mt-4 inline-block text-red-500"
        >
          Delete User
        </Link>
      </div>
      <div className="w-full md:w-3/4 p-6">
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
    </div>
  );
}
