import {
  createPost,
  getPostById,
  getAllPosts,
  getPostBySeller,
  updatePost,
  deletePost,
} from "../services/post.js";
import { Post } from "../db/models/post.js";
import User from "../db/models/user.js";
import { z } from "zod";

jest.mock("../db/models/post.js");
jest.mock("../db/models/user.js");

describe("Post Service", () => {
  const userId = "user123";
  const validPost = {
    title: "Test Post",
    description: "A great vehicle",
    price: 10000,
    vehicleType: "car",
    year: 2020,
    mileage: 15000,
    location: "New York",
    contactInfo: "contact@example.com",
    images: ["image1.jpg", "image2.jpg"],
  };

  const invalidPost = {
    title: "",
    price: -100,
    vehicleType: "plane", // Invalid vehicle type
    year: 1800, // Invalid year
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    it("should create a post successfully", async () => {
      Post.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(validPost),
      }));

      const result = await createPost(userId, validPost);
      expect(result).toEqual(validPost);
      expect(Post).toHaveBeenCalledWith(validPost);
    });

    it("should throw an error for invalid post data", async () => {
      await expect(createPost(userId, invalidPost)).rejects.toThrow(
        "Invalid post data:"
      );
    });
  });

  describe("getPostById", () => {
    it("should return a post by ID", async () => {
      Post.findById.mockResolvedValue(validPost);
      const result = await getPostById("post123");
      expect(result).toEqual(validPost);
    });

    it("should return null if post not found", async () => {
      Post.findById.mockResolvedValue(null);
      const result = await getPostById("post123");
      expect(result).toBeNull();
    });
  });

  describe("getAllPosts", () => {
    it("should return all posts", async () => {
      const posts = [validPost, { ...validPost, title: "Another Post" }];
      Post.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(posts),
      });

      const result = await getAllPosts();
      expect(result).toEqual(posts);
    });
  });

  describe("getPostBySeller", () => {
    it("should return posts by seller", async () => {
      User.findOne.mockResolvedValue({ _id: userId });
      const posts = [validPost];
      Post.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(posts),
      });

      const result = await getPostBySeller("sellerUsername");
      expect(result).toEqual(posts);
    });

    it("should return an empty array if user not found", async () => {
      User.findOne.mockResolvedValue(null);
      const result = await getPostBySeller("nonExistentUser");
      expect(result).toEqual([]);
    });
  });

  describe("updatePost", () => {
    it("should update a post successfully", async () => {
      const updatedPost = { title: "Updated Title" };
      Post.findOneAndUpdate.mockResolvedValue({ ...validPost, ...updatedPost });

      const result = await updatePost(userId, "post123", updatedPost);
      expect(result).toEqual({ ...validPost, ...updatedPost });
    });

    it("should throw an error for invalid update data", async () => {
      await expect(updatePost(userId, "post123", invalidPost)).rejects.toThrow(
        "Invalid update data:"
      );
    });

    it("should return null if post not found", async () => {
      Post.findOneAndUpdate.mockResolvedValue(null);
      const result = await updatePost(userId, "post123", {
        title: "New Title",
      });
      expect(result).toBeNull();
    });
  });

  describe("deletePost", () => {
    it("should delete a post successfully", async () => {
      Post.deleteOne.mockResolvedValue({ deletedCount: 1 });
      const result = await deletePost(userId, "post123");
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});
