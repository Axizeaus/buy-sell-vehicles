import { Post } from "../db/models/post.js";
import { z } from "zod";

const postSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  vehicleType: z.enum(["car", "motorcycle"]),
  year: z.number().int().min(1886).max(new Date().getFullYear()),
  mileage: z.number().nonnegative().optional(),
  location: z.string(),
  contactInfo: z.string(),
  images: z.array(z.string()).optional(),
});

export async function createPost(post) {
  const parsedPost = postSchema.safeParse(post);

  if (parsedPost.success) {
    const newPost = new Post(parsedPost.data);
    try {
      const savedPost = await newPost.save();
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

export async function getAllPosts() {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw error;
  }
}

export async function updatePost(postId, updatedPost) {
  const parsedPost = postSchema.partial().safeParse(updatedPost);

  if (parsedPost.success) {
    try {
      const post = await Post.findByIdAndUpdate(postId, parsedPost.data, {
        new: true,
      });
      return !post ? null : post;
    } catch (error) {
      throw new Error("Error updating post: " + error.message);
    }
  } else {
    throw new Error("Invalid update data: " + parsedPost.error.message);
  }
}

export async function deletePost(postId) {
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    throw error;
  }
}
