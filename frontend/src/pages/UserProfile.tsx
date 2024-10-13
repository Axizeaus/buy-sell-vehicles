import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/users.js";
import { getPostByUser } from "../api/posts.js";
import { useParams, Link } from "react-router-dom";
import PostList from "@/components/PostList.js";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function UserProfile() {
  const { userId } = useParams();
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");

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
  const postsPerPage = 6;

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

  const isCurrentUser = localUser.id === userId;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-gray-300 flex flex-col bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          User Profile
        </h1>
        <strong className="text-xl text-gray-900 dark:text-gray-200">
          {user?.username}
        </strong>

        {user.location && Object.keys(user.location).length > 0 && (
          <div className="mt-4 flex items-center text-gray-700 dark:text-gray-300">
            <FaMapMarkerAlt className="mr-2 text-gray-600 dark:text-gray-400" />
            <p>
              {user.location.city}, {user.location.state}
            </p>
          </div>
        )}

        {user.contactInfo && Object.keys(user.contactInfo).length > 0 && (
          <div className="mt-4 flex flex-col text-gray-700 dark:text-gray-300">
            <div className="flex items-center mb-2">
              <FaEnvelope className="mr-2 text-gray-600 dark:text-gray-400" />
              <p className="truncate">{user.contactInfo.email}</p>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-gray-600 dark:text-gray-400" />
              <p className="truncate">{user.contactInfo.phone}</p>
            </div>
          </div>
        )}

        {user.miscellaneous && user.miscellaneous !== null && (
          <div className="mt-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">
              Miscellaneous
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {user.miscellaneous}
            </p>
          </div>
        )}

        {isCurrentUser && (
          <div className="mt-4">
            <Link
              to={`/user/${userId}/edit`}
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-600"
            >
              Edit User
            </Link>
            <Link
              to={`/user/${userId}/delete`}
              className="inline-block text-red-500 ml-4 transition duration-200 hover:text-red-700"
            >
              Delete User
            </Link>
          </div>
        )}
      </div>
      <div className="w-full md:w-3/4 px-6">
        <PostList
          posts={paginatedPosts}
          totalPosts={totalPosts}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={postsPerPage}
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 bg-gray-300 rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400"
            }`}
          >
            Previous
          </button>
          <button
            onClick={onNextPage}
            disabled={currentPage >= Math.ceil(totalPosts / postsPerPage)}
            className={`py-2 px-4 bg-gray-300 rounded ${
              currentPage >= Math.ceil(totalPosts / postsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
