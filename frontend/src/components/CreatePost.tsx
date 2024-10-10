import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

enum VehicleType {
  Car = "car",
  Motorcycle = "motorcycle",
}

interface InvalidateQueryFilters {
  queryKey: string[];
  staleTime?: number;
  cacheTime?: number;
}

const CreatePost: React.FC = () => {
  const [token, user] = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.Car);
  const [year, setYear] = useState<number | "">("");
  const [mileage, setMileage] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const seller = user?.id;

  const newPost = {
    title,
    description,
    price: Number(price),
    vehicleType,
    year: Number(year),
    mileage: mileage ? Number(mileage) : undefined,
    location,
    contactInfo,
    images,
    seller: "default user",
    createdAt: new Date().toISOString(),
  };

  const queryClient = useQueryClient();
  const queryFilters: string[] = ["posts"];
  const invalidateFilters: InvalidateQueryFilters = {
    queryKey: queryFilters,
  };

  const createPostMutation = useMutation({
    mutationFn: () => {
      if (token !== null && seller !== undefined) {
        return createPost(token, newPost);
      } else {
        return Promise.reject(new Error("Token is required"));
      }
    },
    onSuccess: () => queryClient.invalidateQueries(invalidateFilters),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate();

    setTitle("");
    setDescription("");
    setPrice("");
    setVehicleType(VehicleType.Car);
    setYear("");
    setMileage("");
    setLocation("");
    setContactInfo("");
    setImages([]);

    navigate("/");
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Please log in to create a new post.
        </h3>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block mb-2 font-semibold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-3 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block mb-2 font-semibold">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>

        {/* Price Field */}
        <div>
          <label className="block mb-2 font-semibold">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? Number(e.target.value) : "")
            }
            required
            min="0"
            className="border p-3 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>

        {/* Vehicle Type Field */}
        <div>
          <label className="block mb-2 font-semibold">Vehicle Type:</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as VehicleType)}
            className="border p-3 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
          >
            <option value={VehicleType.Car}>Car</option>
            <option value={VehicleType.Motorcycle}>Motorcycle</option>
          </select>
        </div>

        {/* Year Field */}
        <div>
          <label className="block mb-2 font-semibold">Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) =>
              setYear(e.target.value ? Number(e.target.value) : "")
            }
            required
            min="1886"
            max={new Date().getFullYear()}
            className="border p-3 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>

        {/* Mileage Field */}
        <div>
          <label className="block mb-2 font-semibold">Mileage:</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) =>
              setMileage(e.target.value ? Number(e.target.value) : "")
            }
            min="0"
            className="border p-3 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>

        {/* Location Field */}
        <div>
          <label className="block mb-2 font-semibold">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="border p-3 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>

        {/* Contact Info Field */}
        <div>
          <label className="block mb-2 font-semibold">Contact Info:</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
            className="border p-3 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>

        {/* Images Field */}
        <div>
          <label className="block mb-2 font-semibold">
            Images (comma-separated URLs):
          </label>
          <input
            type="text"
            value={images.join(", ")}
            onChange={(e) =>
              setImages(e.target.value.split(",").map((img) => img.trim()))
            }
            className="border p-3 rounded-lg w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`p-3 rounded-lg w-full ${
            createPostMutation.isPending
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } transition-all duration-300`}
          disabled={!title || createPostMutation.isPending}
        >
          {createPostMutation.isPending ? "Creating..." : "Create Post"}
        </button>

        {createPostMutation.isSuccess && (
          <div className="mt-4 text-green-500">Post created successfully!</div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
