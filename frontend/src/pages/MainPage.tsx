import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import { useState, useEffect } from "react";
import PostFilter from "../components/PostFilter";
import PostSorting from "../components/PostSorting";
import PostList from "../components/PostList";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Button } from "@/components/ui/button.js";
import { useNavigate } from "react-router-dom";
import { PostProps } from "../types";

export default function MainPage() {
  const [priceRange, setPriceRange] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");
  const [debouncedLocation, setDebouncedLocation] = useState(location);
  const navigate = useNavigate();

  const [token] = useAuth();

  const queryParams = {
    limit: String(10),
    offset: String(0),
    sortBy,
    sortOrder,
    priceRange,
    vehicleType,
    location: debouncedLocation,
  };

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery<PostProps[]>({
    queryKey: ["posts", { ...queryParams }],
    queryFn: () => getPosts(queryParams),
    enabled: true,
  });

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLocation(location);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [location]);

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (isError) {
    return <div>Error loading posts: {error.message}</div>;
  }

  return (
    <div className="flex">
      {/* Filter Section */}
      <div className="w-1/4 p-4 border-r border-gray-300">
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
        <h2 className="text-lg font-semibold mb-2">Filter By:</h2>
        <PostFilter
          field="Price Range"
          options={["0-100", "101-500", "501-1000", "1001+"]}
          value={priceRange}
          onChange={(value) => setPriceRange(value)}
        />
        <PostFilter
          field="Vehicle Type"
          options={["car", "motorcycle"]}
          value={vehicleType}
          onChange={(value) => setVehicleType(value)}
        />
        <PostFilter
          field="Location"
          value={location}
          onChange={(value) => setLocation(value)}
        />
        <PostSorting
          fields={["createdAt", "updatedAt", "price"]}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          orderValue={sortOrder}
          onOrderChange={(orderValue) => setSortOrder(orderValue)}
        />
      </div>

      <div className="w-3/4 p-4">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
