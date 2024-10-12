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

export const getPostByUser = async (userId: string): Promise<PostProps[]> => {
  console.log("Fetching posts for user ID:", userId);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`
    );

    if (!res.ok) {
      throw new Error(`Error fetching posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: expected an array.");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in getPostByUser:", error);
    throw new Error("Failed to fetch posts. Please try again later.");
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

export const updatePost = async (
  token: string,
  postId: string,
  updatedPost: PostProps
) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPost),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return await res.json();
};

export const deletePost = async (token: string, postId: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return await res.json();
};
