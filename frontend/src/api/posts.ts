import { PostProps } from "@/types";

interface QueryParams {
  limit?: string;
  offset?: string;
  sortBy?: string;
  sortOrder?: string;
  priceRange?: string;
  vehicleType?: string;
  location?: string;
  [key: string]: string | undefined; // Index signature
}

export const getPosts = async (
  queryParams: QueryParams = {}
): Promise<PostProps[]> => {
  console.log("Fetching posts with query parameters:", queryParams);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts?` +
        new URLSearchParams(queryParams as Record<string, string>)
    );

    if (!res.ok) {
      throw new Error(`Error fetching posts: ${res.status} ${res.statusText}`);
    }

    const data: PostProps[] = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: expected an array of posts.");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in getPosts:", error);
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
