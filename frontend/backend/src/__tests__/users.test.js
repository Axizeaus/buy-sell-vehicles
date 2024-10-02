import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/user.js";
import { createUser, loginUser, getUserInfoById } from "../services/users.js";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../db/models/user.js");

describe("User Service", () => {
  const username = "testuser";
  const password = "password123";
  const userId = "user123";
  const hashedPassword = "hashedPassword";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      bcrypt.hash.mockResolvedValue(hashedPassword);
      User.mockImplementation(() => ({
        save: jest
          .fn()
          .mockResolvedValue({ username, password: hashedPassword }),
      }));

      const result = await createUser({ username, password });
      expect(result).toEqual({ username, password: hashedPassword });
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(User).toHaveBeenCalledWith({ username, password: hashedPassword });
    });
  });

  describe("loginUser", () => {
    it("should return a token for valid credentials", async () => {
      User.findOne.mockResolvedValue({ _id: userId, password: hashedPassword });
      bcrypt.compare.mockResolvedValue(true);
      const token = "jwtToken";
      jwt.sign.mockReturnValue(token);

      const result = await loginUser({ username, password });
      expect(result).toBe(token);
      expect(User.findOne).toHaveBeenCalledWith({ username });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(jwt.sign).toHaveBeenCalledWith(
        { sub: userId },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
    });

    it("should throw an error for invalid username", async () => {
      User.findOne.mockResolvedValue(null);
      await expect(loginUser({ username, password })).rejects.toThrow(
        "invalid username!"
      );
    });

    it("should throw an error for invalid password", async () => {
      User.findOne.mockResolvedValue({ _id: userId, password: hashedPassword });
      bcrypt.compare.mockResolvedValue(false);
      await expect(loginUser({ username, password })).rejects.toThrow(
        "invalid password"
      );
    });
  });

  describe("getUserInfoById", () => {
    it("should return user info for a valid user ID", async () => {
      User.findById.mockResolvedValue({ username });
      const result = await getUserInfoById(userId);
      expect(result).toEqual({ username });
      expect(User.findById).toHaveBeenCalledWith(userId);
    });

    it("should return username as userId if user not found", async () => {
      User.findById.mockResolvedValue(null);
      const result = await getUserInfoById(userId);
      expect(result).toEqual({ username: userId });
    });

    it("should return username as userId if an error occurs", async () => {
      User.findById.mockImplementation(() => {
        throw new Error("Database error");
      });
      const result = await getUserInfoById(userId);
      expect(result).toEqual({ username: userId });
    });
  });
});
