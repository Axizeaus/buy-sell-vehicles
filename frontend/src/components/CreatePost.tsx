import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import { PostProps, InvalidateQueryFilters } from "@/types";

const CreatePost: React.FC = () => {
  const [token, user] = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryFilters: string[] = ["posts"];
  const invalidateFilters: InvalidateQueryFilters = {
    queryKey: queryFilters,
  };

  const createPostMutation = useMutation({
    mutationFn: (newPost: PostProps) => {
      if (token !== null && user?.id !== undefined) {
        return createPost(token, {
          ...newPost,
          seller: user.id,
          createdAt: new Date().toISOString(),
        });
      } else {
        return Promise.reject(new Error("Token is required"));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(invalidateFilters);
      navigate("/");
    },
  });

  if (!token) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Please log in to create a new post.
        </h3>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">Create Post</h2>
      <PostForm
        onSubmit={createPostMutation.mutate}
        isSubmitting={createPostMutation.isPending}
      />
      {createPostMutation.isSuccess && (
        <div className="mt-4 text-green-500">Post created successfully!</div>
      )}
    </div>
  );
};

export default CreatePost;
