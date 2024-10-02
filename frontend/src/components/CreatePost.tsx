import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts";
import { useAuth } from "@/contexts/AuthContext";

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
  const [token] = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.Car);
  const [year, setYear] = useState<number | "">("");
  const [mileage, setMileage] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [images, setImages] = useState<string[]>([]);

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
    createdAt: new Date().toISOString(),
  };
  console.log(newPost);

  const queryClient = useQueryClient();
  const queryFilters: string[] = ["posts"];
  const invalidateFilters: InvalidateQueryFilters = {
    queryKey: queryFilters,
  };

  const createPostMutation = useMutation({
    mutationFn: () => {
      if (token !== null) {
        return createPost(token, newPost);
      } else {
        return Promise.reject(new Error("Token is required"));
      }
    },
    onSuccess: () => queryClient.invalidateQueries(invalidateFilters),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(newPost);
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
  };

  if (!token) {
    return <div>Please log in to create a new post.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value ? Number(e.target.value) : "")
          }
          required
          min="0"
        />
      </div>
      <div>
        <label>Vehicle Type:</label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value as VehicleType)}
        >
          <option value={VehicleType.Car}>Car</option>
          <option value={VehicleType.Motorcycle}>Motorcycle</option>
        </select>
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) =>
            setYear(e.target.value ? Number(e.target.value) : "")
          }
          required
          min="1886"
          max={new Date().getFullYear()}
        />
      </div>
      <div>
        <label>Mileage:</label>
        <input
          type="number"
          value={mileage}
          onChange={(e) =>
            setMileage(e.target.value ? Number(e.target.value) : "")
          }
          min="0"
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contact Info:</label>
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Images (comma-separated URLs):</label>
        <input
          type="text"
          value={images.join(", ")}
          onChange={(e) =>
            setImages(e.target.value.split(",").map((img) => img.trim()))
          }
        />
      </div>
      <button
        type="submit"
        value={createPostMutation.isPending ? "Creating..." : "Create"}
        disabled={!title || createPostMutation.isPending}
      >
        Create Post
      </button>
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully
        </>
      ) : null}
    </form>
  );
};

export default CreatePost;
