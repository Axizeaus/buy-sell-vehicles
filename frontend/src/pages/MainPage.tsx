import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import { useState } from "react";
import PostFilter from "../components/PostFilter";
import PostSorting from "../components/PostSorting";
import PostList from "../components/PostList";
import { useAuth } from "../contexts/AuthContext.jsx"; // Import your authentication context
import { Button } from "@/components/ui/button.js";
import { useNavigate } from "react-router-dom";

export default function Placeholder() {
  const [seller, setSeller] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");
  const navigate = useNavigate();

  const [token] = useAuth();

  const postsQuery = useQuery({
    queryKey: ["posts", { seller, sortBy, sortOrder }],
    queryFn: () => getPosts({ seller, sortBy, sortOrder }),
  });
  const posts = postsQuery.data ?? [];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        {token && (
          <Button
            className="ml-auto"
            onClick={() => {
              navigate("/posts/create");
            }}
          >
            Create Post
          </Button>
        )}
      </div>
      <div>Filter By:</div>
      <PostFilter
        field="seller"
        value={seller}
        onChange={(value) => setSeller(value)}
      />
      <PostSorting
        fields={["createdAt", "updatedAt", "price"]}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <PostList posts={posts} />
    </div>
  );
}
