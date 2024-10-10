import "dotenv/config";

import mongoose from "mongoose";
import { Post } from "./src/db/models/post.js";

const sellerId = new mongoose.Types.ObjectId("6706a76ab7e17dce6146ced6"); // Use mongoose.Types.ObjectId

const posts = Array.from({ length: 30 }, (_, index) => ({
  title: `Vehicle ${index + 1}`,
  description: `Description for vehicle ${index + 1}`,
  price: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000, // Random price between 1000 and 10000
  vehicleType: index % 2 === 0 ? "car" : "motorcycle", // Alternate between car and motorcycle
  year: 2020 + (index % 5), // Varying years from 2020 to 2024
  mileage: Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000, // Random mileage between 1000 and 100000
  location: ["Lashio", "Yangon", "Mandalay", "Naypyidaw"][index % 4], // Cycle through locations
  contactInfo: `Contact info for vehicle ${index + 1}`,
  images: [], // You can add image URLs if needed
  seller: sellerId,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

async function seedDatabase() {
  try {
    console.log(process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL);

    await Post.deleteMany({}); // Clear existing posts if needed
    const result = await Post.insertMany(posts);
    console.log(`${result.length} posts inserted successfully!`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
