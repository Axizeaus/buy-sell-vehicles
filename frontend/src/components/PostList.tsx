import Post from "./Post";
import { PostProps } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
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
  const maxVisibleButtons = 5;

  const getPaginationItems = () => {
    const items = [];
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      items.push(1);
      if (startPage > 2)
        items.push(<PaginationEllipsis key="ellipsis-start" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1)
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      items.push(totalPages);
    }

    return items;
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  href="#"
                  onClick={currentPage === 1 ? undefined : onPreviousPage}
                  className={
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }
                />
              </PaginationItem>

              {getPaginationItems().map((item, index) => (
                <PaginationItem key={index}>
                  {typeof item === "number" ? (
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(item)}
                      className={`px-3 py-1 rounded ${
                        currentPage === item
                          ? "bg-gray-500 text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {item}
                    </PaginationLink>
                  ) : (
                    item
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
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
