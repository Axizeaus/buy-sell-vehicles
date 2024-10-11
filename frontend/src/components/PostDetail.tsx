import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostById } from "@/api/posts";

export default function PostDetail() {
  const { id: postId } = useParams<{ id: string }>();

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{post?._id}</div>;
}
