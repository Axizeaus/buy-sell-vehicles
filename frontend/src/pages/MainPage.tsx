import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import { useState, useEffect } from "react";
import PostFilter from "../components/PostFilter";
import PostSorting from "../components/PostSorting";
import PostList from "../components/PostList";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Button } from "@/components/ui/button.js";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [priceRange, setPriceRange] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");
  const [debouncedLocation, setDebouncedLocation] = useState(location);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [token] = useAuth();

  const postsPerPage = 6;

  const queryParams = {
    sortBy,
    sortOrder,
    priceRange,
    vehicleType,
    location: debouncedLocation,
  };

  const {
    data: { posts = [], totalPosts = 0 } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "posts",
      sortBy,
      sortOrder,
      priceRange,
      vehicleType,
      debouncedLocation,
    ],
    queryFn: async () => {
      const response = await getPosts(queryParams);
      return response;
    },
    enabled: true,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLocation(location);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [location]);

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(totalPosts / postsPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  console.log("Paginated Posts:", paginatedPosts);

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error loading posts: {error.message}</div>;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-gray-300">
        <div className="flex justify-between items-center mb-4">
          {token && (
            <Button
              className="ml-auto text-base md:text-lg p-2"
              onClick={() => navigate("/posts/create")}
            >
              Create Post
            </Button>
          )}
        </div>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Filter By:</h2>
        <PostFilter
          field="Price Range"
          options={[
            "0-100",
            "101-200",
            "201-300",
            "301-400",
            "401-500",
            "501-600",
            "601-700",
            "701-800",
            "801-900",
            "901-1000",
            "1001-1500",
            "1501-2000",
            "2001+",
          ]}
          value={priceRange}
          onChange={setPriceRange}
        />
        <PostFilter
          field="Vehicle Type"
          options={["car", "motorcycle"]}
          value={vehicleType}
          onChange={setVehicleType}
        />
        <PostFilter field="Location" value={location} onChange={setLocation} />
        <PostSorting
          fields={["createdAt", "updatedAt", "price"]}
          value={sortBy}
          onChange={setSortBy}
          orderValue={sortOrder}
          onOrderChange={setSortOrder}
        />
      </div>
      <div className="w-full md:w-3/4 p-6">
        <PostList
          totalPosts={totalPosts}
          posts={paginatedPosts}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={postsPerPage}
        />
      </div>
    </div>
  );
}
