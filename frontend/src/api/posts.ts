import { PostProps } from "@/types";

export const getPosts = async (
  queryParams:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined
) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams)
  );
  return await res.json();
};

export const createPost = async (token: string, post: PostProps) => {
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
