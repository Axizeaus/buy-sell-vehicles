import mongoose from "mongoose";
import { describe, expect, test, beforeEach } from "@jest/globals";
import {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
} from "../services/post.js";
import { Post } from "../db/models/post";

describe("Post Service Tests", () => {
  const samplePosts = [
    {
      title: "First Post",
      author: "Jane Doe",
      price: 5000,
      vehicleType: "car",
      year: 2020,
      location: "New York",
      contactInfo: "jane.doe@example.com",
    },
    {
      title: "Second Post",
      author: "John Doe",
      price: 3000,
      vehicleType: "motorcycle",
      year: 2019,
      location: "Los Angeles",
      contactInfo: "john.doe@example.com",
    },
  ];

  let createdSamplePosts = [];

  beforeEach(async () => {
    await Post.deleteMany({});
    createdSamplePosts = [];
    for (const post of samplePosts) {
      const createdPost = new Post(post);
      createdSamplePosts.push(await createdPost.save());
    }
  });

  describe("Creating posts", () => {
    test("with all parameters should succeed", async () => {
      const post = {
        title: "Hello Mongoose!",
        author: "Daniel Bugl",
        price: 10000,
        vehicleType: "car",
        year: 2021,
        location: "New York",
        contactInfo: "contact@example.com",
      };
      const createdPost = await createPost(post);
      expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
      const foundPost = await Post.findById(createdPost._id);
      expect(foundPost).toEqual(expect.objectContaining(post));
      expect(foundPost.createdAt).toBeInstanceOf(Date);
      expect(foundPost.updatedAt).toBeInstanceOf(Date);
    });

    test("without required fields should fail", async () => {
      const post = {
        author: "Daniel Bugl",
      };
      try {
        await createPost(post);
      } catch (err) {
        expect(err.message).toContain("Invalid post data:");
      }
    });
  });

  describe("Listing posts", () => {
    test("should return all posts", async () => {
      const posts = await getAllPosts();
      expect(posts.length).toEqual(createdSamplePosts.length);
    });
  });

  describe("Getting a post by ID", () => {
    test("should return the full post", async () => {
      const post = await getPostById(createdSamplePosts[0]._id);
      expect(post.toObject()).toEqual(createdSamplePosts[0].toObject());
    });

    test("should return null if the post does not exist", async () => {
      console.info(await getPostById(new mongoose.Types.ObjectId()));
      const post = await getPostById(new mongoose.Types.ObjectId());
      expect(post).toBeNull();
    });
  });

  describe("Updating posts", () => {
    test("should update the specified property", async () => {
      await updatePost(createdSamplePosts[0]._id, {
        author: "Updated Author",
      });
      const updatedPost = await Post.findById(createdSamplePosts[0]._id);
      expect(updatedPost.author).toEqual("Updated Author");
    });

    test("should throw an error if the update data is invalid", async () => {
      try {
        await updatePost(createdSamplePosts[0]._id, { price: -500 });
      } catch (err) {
        expect(err.message).toContain("Invalid update data:");
      }
    });
  });

  describe("Deleting posts", () => {
    test("should remove the post from the database", async () => {
      const deletedPost = await deletePost(createdSamplePosts[0]._id);
      expect(deletedPost._id).toEqual(createdSamplePosts[0]._id);
      const foundPost = await Post.findById(createdSamplePosts[0]._id);
      expect(foundPost).toBeNull();
    });

    test("should throw an error if the post does not exist", async () => {
      try {
        await deletePost(new mongoose.Types.ObjectId());
      } catch (err) {
        expect(err.message).toContain("Post not found");
      }
    });
  });
});
