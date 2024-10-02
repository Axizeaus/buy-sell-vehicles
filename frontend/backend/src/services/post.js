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

async function listPosts(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {}
) {
  try {
    const postList = await Post.find(query).sort({ [sortBy]: sortOrder });
    return postList;
  } catch (error) {
    throw error;
  }
}

export async function getAllPosts(options) {
  return await listPosts({}, options);
}

export async function getPostBySeller(seller, options) {
  const user = await User.findOne({ username: seller });
  if (!user) return [];
  return await listPosts({ seller: user._id }, options);
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
    const post = await Post.deleteOne({ _id: postId, seller: userId });
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    throw error;
  }
}
