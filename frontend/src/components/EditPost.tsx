import React from "react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { updatePost, getPostById } from "@/api/posts";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "./PostForm";
import { PostProps, VehicleType } from "@/types";

const EditPost: React.FC = () => {
  const { id: postId } = useParams<{ id: string }>();
  console.log(postId);
  const [token, user] = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId!),
  });

  const updatePostMutation = useMutation({
    mutationFn: (updatedPost: PostProps) => {
      if (token !== null && user?.id !== undefined) {
        return updatePost(token, postId!, {
          ...updatedPost,
          seller: user.id,
        });
      } else {
        return Promise.reject(new Error("Token is required"));
      }
    },
    onSuccess: () => {
      const queryFilters: string[] = ["posts"];
      const invalidateFilters: InvalidateQueryFilters = {
        queryKey: queryFilters,
      };
      queryClient.invalidateQueries(invalidateFilters);
      navigate(`/posts/${postId}`);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
      <PostForm
        initialData={{
          title: post.title,
          description: post.description,
          price: post.price,
          vehicleType: post.vehicleType as VehicleType,
          year: post.year,
          mileage: post.mileage as number,
          location: post.location,
          contactInfo: post.contactInfo,
          images: post.images,
        }}
        onSubmit={updatePostMutation.mutate}
        isSubmitting={updatePostMutation.isPending}
      />
      {updatePostMutation.isSuccess && (
        <div className="mt-4 text-green-500">Post updated successfully!</div>
      )}
    </div>
  );
};

export default EditPost;
