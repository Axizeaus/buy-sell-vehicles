import CreatePost from "./components/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
import { useState } from "react";
import PostFilter from "./components/PostFilter";
import PostSorting from "./components/PostSorting";
import PostList from "./components/PostList";

export default function Placeholder() {
  const [seller, setSeller] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");

  const postsQuery = useQuery({
    queryKey: ["posts", { seller, sortBy, sortOrder }],
    queryFn: () => getPosts({ seller, sortBy, sortOrder }),
  });
  const posts = postsQuery.data ?? [];

  return (
    <>
      <CreatePost />
      <PostFilter
        field="seller"
        value={seller}
        onChange={(value) => setSeller(value)}
      />
      <PostSorting
        fields={["createdAt", "updatedAt"]}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <PostList posts={posts} />
    </>
  );
}
