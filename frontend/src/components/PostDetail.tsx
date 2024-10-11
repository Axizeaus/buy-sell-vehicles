import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostById } from "@/api/posts";
import { getUserInfo } from "@/api/users";

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

  console.log(JSON.stringify(post));
  console.log(JSON.stringify(seller));

  if (post !== undefined) {
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
          <div>{seller.username}</div>
        </div>
      </div>
    );
  }

  return null;
}
