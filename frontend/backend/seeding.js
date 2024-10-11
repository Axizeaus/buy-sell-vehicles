import "dotenv/config";
import mongoose from "mongoose";
import { Post } from "./src/db/models/post.js";

const sellerId = new mongoose.Types.ObjectId("6706a76ab7e17dce6146ced6");

const locations = [
  "Lashio",
  "Yangon",
  "Mandalay",
  "Naypyidaw",
  "Bagan",
  "Taunggyi",
  "Myitkyina",
  "Pathein",
];

// Function to generate a random vehicle title
const generateVehicleTitle = (index) => `Vehicle ${index + 1}`;

// Function to generate a random description
const generateDescription = () => {
  const descriptions = [
    "A reliable vehicle for all your needs.",
    "Perfect for city driving and long trips.",
    "Well-maintained and in excellent condition.",
    "Great fuel efficiency and low maintenance costs.",
    "Ideal for families and adventure seekers.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Function to generate a random phone number
const generatePhoneNumber = () => {
  const areaCode = Math.floor(Math.random() * 900) + 100; // Random area code
  const number = Math.floor(Math.random() * 9000000) + 1000000; // Random 7-digit number
  return `(${areaCode}) ${number}`;
};

// Generate posts
const posts = Array.from({ length: 30 }, (_, index) => ({
  title: generateVehicleTitle(index), // Generate a vehicle name
  description: generateDescription(), // Generate a random description
  price: Math.floor(Math.random() * 1000), // Random price between 1000 and 10000
  vehicleType: index % 2 === 0 ? "car" : "motorcycle", // Alternate between car and motorcycle
  year: Math.floor(Math.random() * (2024 - 2010 + 1)) + 2010, // Random year between 2010 and 2024
  mileage: Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000, // Random mileage between 1000 and 100000
  location: locations[Math.floor(Math.random() * locations.length)], // Randomly select a location
  contactInfo: generatePhoneNumber(), // Generate a random phone number
  images: [
    "https://via.placeholder.com/150", // Placeholder image URL
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ],
  seller: sellerId,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

async function seedDatabase() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Clearing existing posts...");
    await Post.deleteMany({}); // Clear existing posts if needed

    console.log("Inserting new posts...");
    const result = await Post.insertMany(posts);
    console.log(`${result.length} posts inserted successfully!`);
  } catch (error) {
    console.error("Error seeding database:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed.");
  }
}

seedDatabase();
