import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/user.js";
import { Post } from "../db/models/post.js";
import {
  createUser,
  loginUser,
  getUserInfoById,
  getAllUsers,
  updateUser,
  deleteUser,
  searchUserByUsername,
} from "../services/users.js";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../db/models/user.js");
jest.mock("../db/models/post.js");

describe("User Management Functions", () => {
  const mockUser = {
    _id: "12345",
    username: "testuser",
    password: "hashedpassword",
    location: "Test Location",
    contactInfo: { email: "test@example.com" },
    miscellaneous: "Some info",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user successfully", async () => {
      bcrypt.hash.mockResolvedValue("hashedpassword");
      User.prototype.save = jest.fn().mockResolvedValue(mockUser);

      const result = await createUser({
        username: "testuser",
        password: "password",
        location: "Test Location",
        contactInfo: { email: "test@example.com" },
        miscellaneous: "Some info",
      });

      expect(result).toEqual(mockUser);
      expect(User.prototype.save).toHaveBeenCalled();
    });

    it("should throw an error if username already exists", async () => {
      User.prototype.save = jest.fn().mockRejectedValue({
        code: 11000,
        keyPattern: { username: 1 },
      });

      await expect(
        createUser({ username: "testuser", password: "password" })
      ).rejects.toThrow("Username already exists");
    });

    it("should throw an error if email already exists", async () => {
      User.prototype.save = jest.fn().mockRejectedValue({
        code: 11000,
        keyPattern: { "contactInfo.email": 1 },
      });

      await expect(
        createUser({
          username: "testuser",
          password: "password",
          contactInfo: { email: "test@example.com" },
        })
      ).rejects.toThrow("Email already exists");
    });

    it("should throw a generic error on failure", async () => {
      User.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error("Some error"));

      await expect(
        createUser({ username: "testuser", password: "password" })
      ).rejects.toThrow("User creation failed");
    });
  });

  describe("loginUser", () => {
    it("should log in a user successfully", async () => {
      User.findOne = jest.fn().mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token");

      const result = await loginUser({
        username: "testuser",
        password: "password",
      });

      expect(result).toEqual({
        token: "token",
        user: {
          id: mockUser._id,
          username: mockUser.username,
          location: mockUser.location,
          contactInfo: mockUser.contactInfo,
          miscellaneous: mockUser.miscellaneous,
        },
      });
    });

    it("should throw an error if username is invalid", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        loginUser({ username: "invaliduser", password: "password" })
      ).rejects.toThrow("Invalid username!");
    });

    it("should throw an error if password is incorrect", async () => {
      User.findOne = jest.fn().mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        loginUser({ username: "testuser", password: "wrongpassword" })
      ).rejects.toThrow("Invalid password");
    });
  });

  describe("getUserInfoById", () => {
    it("should return user info by ID", async () => {
      User.findById = jest.fn().mockResolvedValue(mockUser);

      const result = await getUserInfoById("12345");

      expect(result).toEqual({
        username: mockUser.username,
        userId: mockUser._id.toString(),
        location: mockUser.location,
        contactInfo: mockUser.contactInfo,
        miscellaneous: mockUser.miscellaneous,
      });
    });

    it("should return null if user not found", async () => {
      User.findById = jest.fn().mockResolvedValue(null);

      const result = await getUserInfoById("nonexistentId");

      expect(result).toBeNull();
    });

    it("should handle errors gracefully", async () => {
      User.findById = jest.fn().mockRejectedValue(new Error("Database error"));

      const result = await getUserInfoById("12345");

      expect(result).toBeNull();
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      User.find = jest.fn().mockResolvedValue([mockUser]);

      const result = await getAllUsers();

      expect(result).toEqual([
        {
          id: mockUser._id.toString(),
          username: mockUser.username,
          location: mockUser.location,
          contactInfo: mockUser.contactInfo,
          miscellaneous: mockUser.miscellaneous,
        },
      ]);
    });

    it("should return an empty array if no users found", async () => {
      User.find = jest.fn().mockResolvedValue([]);

      const result = await getAllUsers();

      expect(result).toEqual([]);
    });

    it("should handle errors gracefully", async () => {
      User.find = jest.fn().mockRejectedValue(new Error("Database error"));

      const result = await getAllUsers();

      expect(result).toEqual([]);
    });
  });

  describe("updateUser", () => {
    it("should update user information successfully", async () => {
      User.findOne = jest.fn().mockResolvedValue(null); // No existing user with the same username
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

      const result = await updateUser("12345", {
        username: "updateduser",
        location: "Updated Location",
      });

      expect(result).toEqual({
        id: mockUser._id.toString(),
        username: mockUser.username,
        location: mockUser.location,
        contactInfo: mockUser.contactInfo,
        miscellaneous: mockUser.miscellaneous,
      });
    });

    it("should return null if user not found", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const result = await updateUser("nonexistentId", { username: "newuser" });

      expect(result).toBeNull();
    });

    it("should handle errors gracefully", async () => {
      User.findOne = jest.fn().mockRejectedValue(new Error("Database error"));

      const result = await updateUser("12345", { username: "newuser" });

      expect(result).toBeNull();
    });
  });

  describe("deleteUser", () => {
    it("should delete a user successfully", async () => {
      Post.find = jest.fn().mockResolvedValue([]); // No posts to delete
      User.findByIdAndDelete = jest.fn().mockResolvedValue(mockUser);

      const result = await deleteUser("12345");

      expect(result).toEqual({
        id: mockUser._id.toString(),
        username: mockUser.username,
        location: mockUser.location,
        contactInfo: mockUser.contactInfo,
        miscellaneous: mockUser.miscellaneous,
      });
    });

    it("should delete user and their posts if they exist", async () => {
      const mockPosts = [{ _id: "post1" }, { _id: "post2" }];
      Post.find = jest.fn().mockResolvedValue(mockPosts);
      Post.deleteMany = jest.fn().mockResolvedValue({});
      User.findByIdAndDelete = jest.fn().mockResolvedValue(mockUser);

      const result = await deleteUser("12345");

      expect(Post.deleteMany).toHaveBeenCalledWith({ seller: "12345" });
      expect(result).toEqual({
        id: mockUser._id.toString(),
        username: mockUser.username,
        location: mockUser.location,
        contactInfo: mockUser.contactInfo,
        miscellaneous: mockUser.miscellaneous,
      });
    });

    it("should return null if user not found", async () => {
      User.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      const result = await deleteUser("nonexistentId");

      expect(result).toBeNull();
    });

    it("should handle errors gracefully", async () => {
      User.findByIdAndDelete = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));

      const result = await deleteUser("12345");

      expect(result).toBeNull();
    });
  });

  describe("searchUserByUsername", () => {
    it("should return users matching the username", async () => {
      User.find = jest.fn().mockResolvedValue([mockUser]);

      const result = await searchUserByUsername("testuser");

      expect(result).toEqual([
        {
          id: mockUser._id.toString(),
          username: mockUser.username,
          location: mockUser.location,
          contactInfo: mockUser.contactInfo,
          miscellaneous: mockUser.miscellaneous,
        },
      ]);
    });

    it("should return an empty array if no users found", async () => {
      User.find = jest.fn().mockResolvedValue([]);

      const result = await searchUserByUsername("nonexistentuser");

      expect(result).toEqual([]);
    });

    it("should handle errors gracefully", async () => {
      User.find = jest.fn().mockRejectedValue(new Error("Database error"));

      const result = await searchUserByUsername("testuser");

      expect(result).toEqual([]);
    });
  });
});
