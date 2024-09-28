import { PostListProps } from "@/types";
import Post from "./Post";

export default function PostList({ posts }: PostListProps) {
  console.log(posts);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.title} {...post} />
      ))}
    </>
  );
}
