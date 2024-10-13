import "dotenv/config";
import mongoose from "mongoose";
import { Post } from "./src/db/models/post.js";

const sellerId = new mongoose.Types.ObjectId("670b57f6426915eb29c9ea19");

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

const generateVehicleTitle = (index) => `Vehicle ${index + 1}`;

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

const generatePhoneNumber = () => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000000) + 1000000;
  return `(${areaCode}) ${number}`;
};

// Generate posts
const posts = Array.from({ length: 30 }, (_, index) => ({
  title: generateVehicleTitle(index),
  description: generateDescription(),
  price: Math.floor(Math.random() * 1000),
  vehicleType: index % 2 === 0 ? "car" : "motorcycle",
  year: Math.floor(Math.random() * (2024 - 2010 + 1)) + 2010,
  mileage: Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000,
  location: locations[Math.floor(Math.random() * locations.length)],
  contactInfo: generatePhoneNumber(),
  images: [
    "https://via.placeholder.com/150",
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
    await Post.deleteMany({});

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
