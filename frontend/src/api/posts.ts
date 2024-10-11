import { PostProps } from "@/types";

interface QueryParams {
  limit?: string;
  offset?: string;
  sortBy?: string;
  sortOrder?: string;
  priceRange?: string;
  vehicleType?: string;
  location?: string;
  currentPage?: string;
  postsPerPage?: string;
  [key: string]: string | undefined;
}
export const getPosts = async (
  queryParams: QueryParams = {}
): Promise<{ posts: PostProps[]; totalPosts: number }> => {
  console.log("Fetching posts with query parameters:", queryParams);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts?` +
        new URLSearchParams(queryParams as Record<string, string>)
    );

    if (!res.ok) {
      throw new Error(`Error fetching posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Ensure the response is in the expected format
    if (!Array.isArray(data.posts) || typeof data.totalPosts !== "number") {
      throw new Error(
        "Invalid response format: expected an object with posts and totalPosts."
      );
    }

    console.log(data);
    return data; // Return the entire data object containing posts and totalPosts
  } catch (error) {
    console.error("Error in getPosts:", error);
    throw new Error("Failed to fetch posts. Please try again later.");
  }
};

export const getPostById = async (postId: string): Promise<PostProps> => {
  console.log("Fetching post with ID:", postId);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`
    );

    if (!res.ok) {
      throw new Error(`Error fetching post: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (typeof data !== "object" || !data) {
      throw new Error("Invalid response format: expected an object.");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in getPostById:", error);
    throw new Error("Failed to fetch post. Please try again later.");
  }
};

export const createPost = async (token: string, post: PostProps) => {
  console.log(post);
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  return await res.json();
};
