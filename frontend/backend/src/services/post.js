import { Post } from "../db/models/post.js";
import User from "../db/models/user.js";
import { z } from "zod";

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  vehicleType: z.enum(["car", "motorcycle"]),
  year: z.number().int().min(1886).max(new Date().getFullYear()),
  mileage: z.number().nonnegative().optional(),
  location: z.string(),
  contactInfo: z.string(),
  images: z.array(z.string()).optional(),
});

export async function createPost(userId, post) {
  const parsedPost = postSchema.safeParse(post);

  if (parsedPost.success) {
    const newPost = new Post(parsedPost.data);

    newPost.seller = userId;
    try {
      const savedPost = await newPost.save();
      console.log("saved post successfully.");
      return savedPost;
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("Invalid post data: " + parsedPost.error.message);
  }
}

export async function getPostById(postId) {
  try {
    const post = await Post.findById(postId);
    return !post ? null : post;
  } catch (error) {
    throw error;
  }
}

export async function getAllPosts({
  sortBy = "createdAt",
  sortOrder = "descending",
  priceRange,
  vehicleType,
  location,
} = {}) {
  try {
    const filterCriteria = {};

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filterCriteria.price = { $gte: min, $lte: max };
      }
    }

    if (vehicleType) {
      filterCriteria.vehicleType = vehicleType;
    }

    if (location) {
      filterCriteria.location = { $regex: location, $options: "i" };
    }

    const sortOptions = { [sortBy]: sortOrder === "ascending" ? 1 : -1 };

    // Fetch all posts without pagination
    const postList = await Post.find(filterCriteria).sort(sortOptions);

    // Count total posts matching the criteria
    const totalPosts = await Post.countDocuments(filterCriteria);

    return { posts: postList || [], totalPosts };
  } catch (error) {
    console.error("Error retrieving all posts:", error);
    throw new Error("Failed to retrieve posts. Please try again later.");
  }
}

export async function updatePost(userId, postId, updatedPost) {
  const parsedPost = postSchema.partial().safeParse(updatedPost);

  if (parsedPost.success) {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: postId, seller: userId },
        { $set: parsedPost.data },
        {
          new: true,
        }
      );
      return !post ? null : post;
    } catch (error) {
      throw new Error("Error updating post: " + error.message);
    }
  } else {
    throw new Error("Invalid update data: " + parsedPost.error.message);
  }
}

export async function deletePost(userId, postId) {
  try {
    const result = await Post.deleteOne({ _id: postId, seller: userId });

    if (result.deletedCount === 0) {
      throw new Error("Post not found");
    }

    return result;
  } catch (error) {
    throw new Error(
      "An error occurred while trying to delete the post: " + error.message
    );
  }
}
