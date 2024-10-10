import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/user.js";
import { createUser, loginUser, getUserInfoById } from "../services/users.js";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../db/models/user.js");

describe("User Service Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      const userData = { username: "testuser", password: "password123" };
      const hashedPassword = "hashedPassword";

      // Mock bcrypt.hash to return a hashed password
      bcrypt.hash.mockResolvedValue(hashedPassword);

      // Mock User.save to return the user object
      User.prototype.save = jest
        .fn()
        .mockResolvedValue({ ...userData, password: hashedPassword });

      const createdUser = await createUser(userData);

      expect(createdUser).toEqual({ ...userData, password: hashedPassword });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(User.prototype.save).toHaveBeenCalled();
    });
  });

  describe("loginUser", () => {
    it("should log in a user successfully", async () => {
      const userData = { username: "testuser", password: "password123" };
      const userFromDb = {
        _id: "userId",
        username: "testuser",
        password: "hashedPassword",
      };

      // Mock User.findOne to return the user
      User.findOne.mockResolvedValue(userFromDb);

      // Mock bcrypt.compare to return true
      bcrypt.compare.mockResolvedValue(true);

      // Mock jwt.sign to return a token
      jwt.sign.mockReturnValue("token");

      const result = await loginUser(userData);

      expect(result).toEqual({
        token: "token",
        user: { id: userFromDb.id, username: userFromDb.username }, // This will now work
      });
      expect(User.findOne).toHaveBeenCalledWith({
        username: userData.username,
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        userData.password,
        userFromDb.password
      );
    });
  });

  describe("getUserInfoById", () => {
    it("should return user info by ID", async () => {
      const userId = "userId";
      const userFromDb = { username: "testuser" };

      // Mock User.findById to return the user
      User.findById.mockResolvedValue(userFromDb);

      const result = await getUserInfoById(userId);

      expect(result).toEqual({ username: userFromDb.username });
      expect(User.findById).toHaveBeenCalledWith(userId);
    });

    it("should return null if user not found", async () => {
      const userId = "userId";

      // Mock User.findById to return null
      User.findById.mockResolvedValue(null);

      const result = await getUserInfoById(userId);

      expect(result).toBeNull();
      expect(User.findById).toHaveBeenCalledWith(userId);
    });

    it("should handle errors gracefully", async () => {
      const userId = "userId";

      // Mock User.findById to throw an error
      User.findById.mockRejectedValue(new Error("Database error"));

      const result = await getUserInfoById(userId);

      expect(result).toBeNull(); // Expect to return null in case of an error
      expect(User.findById).toHaveBeenCalledWith(userId);
    });
  });
});
