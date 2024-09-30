import { PostListProps } from "@/types";
import Post from "./Post";
import { Fragment } from "react";

export default function PostList({ posts }: PostListProps) {
  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
        </Fragment>
      ))}
    </div>
  );
}
