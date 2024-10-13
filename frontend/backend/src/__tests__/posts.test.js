import {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
} from "../services/post.js";
import { Post } from "../db/models/post.js";
import { z } from "zod";

jest.mock("../db/models/post.js");

describe("Post Service Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    it("should create a post successfully", async () => {
      const userId = "user123";
      const postData = {
        title: "Test Post",
        description: "A test post description",
        price: 1000,
        vehicleType: "car",
        year: 2020,
        mileage: 15000,
        location: "New York",
        contactInfo: "contact@example.com",
        images: ["image1.jpg"],
      };

      const mockSavedPost = { ...postData, _id: "post123", seller: userId };
      Post.prototype.save.mockResolvedValueOnce(mockSavedPost);

      const savedPost = await createPost(userId, postData);

      expect(savedPost).toEqual(mockSavedPost);
      expect(Post.prototype.save).toHaveBeenCalled();
    });

    it("should throw an error for invalid post data", async () => {
      const userId = "user123";
      const invalidPostData = {
        title: "Invalid Post",
        price: -100, // Invalid price
      };

      await expect(createPost(userId, invalidPostData)).rejects.toThrow(
        "Invalid post data:"
      );
    });
  });

  describe("getPostById", () => {
    it("should return a post by ID", async () => {
      const mockPost = { title: "Test Post", _id: "post123" };
      Post.findById.mockResolvedValueOnce(mockPost);

      const post = await getPostById("post123");

      expect(post).toEqual(mockPost);
      expect(Post.findById).toHaveBeenCalledWith("post123");
    });

    it("should return null if post not found", async () => {
      Post.findById.mockResolvedValueOnce(null);

      const post = await getPostById("post123");

      expect(post).toBeNull();
    });
  });

  describe("getAllPosts", () => {
    it("should return a list of posts", async () => {
      const mockPosts = [{ title: "Post 1" }, { title: "Post 2" }];
      const mockTotalPosts = mockPosts.length; // Total posts count
      Post.find.mockReturnValue({
        sort: jest.fn().mockResolvedValueOnce(mockPosts),
      });
      Post.countDocuments.mockResolvedValueOnce(mockTotalPosts); // Mock total count

      const result = await getAllPosts();

      expect(result.posts).toEqual(mockPosts); // Check posts
      expect(result.totalPosts).toBe(mockTotalPosts); // Check total posts count
      expect(Post.find).toHaveBeenCalledWith({});
    });

    it("should handle filtering by price range", async () => {
      const mockPosts = [{ title: "Post 1" }];
      const mockTotalPosts = mockPosts.length; // Total posts count
      Post.find.mockReturnValue({
        sort: jest.fn().mockResolvedValueOnce(mockPosts),
      });
      Post.countDocuments.mockResolvedValueOnce(mockTotalPosts); // Mock total count

      const posts = await getAllPosts({ priceRange: "100-200" });

      expect(posts.posts).toEqual(mockPosts); // Check posts
      expect(posts.totalPosts).toBe(mockTotalPosts); // Check total posts count
      expect(Post.find).toHaveBeenCalledWith({
        price: { $gte: 100, $lte: 200 },
      });
    });
  });

  describe("updatePost", () => {
    it("should update a post successfully", async () => {
      const userId = "user123";
      const postId = "post123";
      const updatedData = { title: "Updated Post" };

      const mockUpdatedPost = { ...updatedData, _id: postId, seller: userId };
      Post.findOneAndUpdate.mockResolvedValueOnce(mockUpdatedPost);

      const updatedPost = await updatePost(userId, postId, updatedData);

      expect(updatedPost).toEqual(mockUpdatedPost);
      expect(Post.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: postId, seller: userId },
        { $set: updatedData },
        { new: true }
      );
    });

    it("should throw an error for invalid update data", async () => {
      const userId = "user123";
      const postId = "post123";
      const invalidUpdateData = { price: -100 }; // Invalid price

      await expect(
        updatePost(userId, postId, invalidUpdateData)
      ).rejects.toThrow("Invalid update data:");
    });

    it("should return null if post not found during update", async () => {
      const userId = "user123";
      const postId = "post123";
      const updatedData = { title: "Updated Post" };

      Post.findOneAndUpdate.mockResolvedValueOnce(null);

      const updatedPost = await updatePost(userId, postId, updatedData);

      expect(updatedPost).toBeNull();
    });
  });

  describe("deletePost", () => {
    it("should delete a post successfully", async () => {
      const userId = "user123";
      const postId = "post123";

      Post.deleteOne.mockResolvedValueOnce({ deletedCount: 1 });

      const result = await deletePost(userId, postId);

      expect(result).toEqual({ deletedCount: 1 });
      expect(Post.deleteOne).toHaveBeenCalledWith({
        _id: postId,
        seller: userId,
      });
    });

    it("should throw an error if post not found during deletion", async () => {
      const userId = "user123";
      const postId = "post123";

      Post.deleteOne.mockResolvedValueOnce({ deletedCount: 0 });

      await expect(deletePost(userId, postId)).rejects.toThrow(
        "Post not found"
      );
    });
  });
});
