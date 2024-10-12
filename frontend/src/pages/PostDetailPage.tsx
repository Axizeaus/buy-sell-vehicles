import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "@/api/posts";
import { getUserInfo } from "@/api/users";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function PostDetail() {
  const { id: postId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      if (!postId) {
        throw new Error("Post id is required");
      }
      return getPostById(postId);
    },
    enabled: !!postId,
  });

  const currentUserString = localStorage.getItem("user");
  let currentUser;

  if (currentUserString) {
    currentUser = JSON.parse(currentUserString);
  } else {
    currentUser = null;
  }

  const {
    data: seller,
    error: sellerError,
    isLoading: isSellerLoading,
  } = useQuery({
    queryKey: ["user", post?.seller],
    queryFn: async () => {
      if (post?.seller) {
        return getUserInfo(post.seller);
      }
      return null;
    },
    enabled: !!post && !!post.seller,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (isSellerLoading) return <div>Loading seller...</div>;
  if (sellerError) return <div>Seller Error: {sellerError.message}</div>;

  const isOwner = post?.seller === currentUser?.id;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (token && postId) {
        await deletePost(token, postId);
        navigate("/");
      } else {
        console.error("Token is null or undefined");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/posts/${postId}/edit`);
  };

  if (!post) {
    return <div>Post not found...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {post.title}
      </h1>
      <div className="mt-2">
        {post.images && post.images.length > 0 ? (
          <img
            src={post.images[0]}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        ) : (
          <div>No images available</div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
        <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
          Price: ${post.price}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Type: {post.vehicleType}
        </p>
        <p className="text-gray-600 dark:text-gray-400">Year: {post.year}</p>
        <p className="text-gray-600 dark:text-gray-400">
          Mileage: {post.mileage} miles
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Location: {post.location}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Contact: {post.contactInfo}
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Images
        </h2>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {post.images && post.images.length > 0 ? (
            post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Vehicle image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))
          ) : (
            <div>No additional images available</div>
          )}
        </div>
        {seller && <div className="mt-2">Seller: {seller.username}</div>}
      </div>

      {isOwner && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white">
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700 dark:text-gray-300">
              <span>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsDialogOpen(false)}
              className="bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-white rounded px-4 py-2"
            >
              <span>Cancel</span>
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
