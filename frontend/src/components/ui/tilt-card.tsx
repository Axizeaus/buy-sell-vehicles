import React from "react";

interface PostCardProps {
  image: string;
  title: string;
  price: number;
  location: string;
}

const PostCard: React.FC<PostCardProps> = ({
  image,
  title,
  price,
  location,
}) => {
  return (
    <div className="group relative max-w-sm mx-auto rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-xl transform transition-all duration-300 hover:scale-105">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover rounded-lg shadow-inner transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 rounded-lg"></div>
        <div className="absolute bottom-2 left-4 text-sm font-medium text-white bg-black/50 px-2 py-1 rounded-md shadow-md">
          {location}
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4 space-y-2">
        <h4 className="text-2xl font-semibold text-white dark:text-gray-100 tracking-tight group-hover:text-yellow-500 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-xl font-bold text-yellow-400 dark:text-yellow-300">
          ${price.toFixed(2)}
        </p>
      </div>

      {/* Decorative Details */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-2 right-2 w-5 h-5 bg-green-400 rounded-full shadow-lg"></div>
        <div className="absolute bottom-3 left-2 w-3 h-3 bg-emerald-400 rounded-full shadow-md"></div>
      </div>
    </div>
  );
};

export default PostCard;
