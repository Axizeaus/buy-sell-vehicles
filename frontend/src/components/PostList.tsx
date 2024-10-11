import Post from "./Post";
import { PostProps } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

interface PostListProps {
  posts: PostProps[];
  totalPosts: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  postsPerPage: number;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  totalPosts,
  onNextPage,
  onPreviousPage,
  currentPage,
  setCurrentPage,
  postsPerPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <Post {...post} />
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-xl">
            No posts available.
          </div>
        )}
      </div>
      {totalPosts > postsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }
                  onClick={currentPage === 1 ? undefined : onPreviousPage}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <button
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-gray-500 text-white"
                        : "text-gray-500"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={currentPage < totalPages ? onNextPage : undefined}
                  className={
                    currentPage < totalPages
                      ? ""
                      : "opacity-50 cursor-not-allowed"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default PostList;
