import { Fragment } from "react";
import Post from "./Post";
import { PostListProps } from "@/types";

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4"></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => {
          return (
            <Fragment key={post._id}>
              <Post {...post} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
