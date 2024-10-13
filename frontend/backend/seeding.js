import "dotenv/config";
import mongoose from "mongoose";
import { Post } from "./src/db/models/post.js";
import User from "./src/db/models/user.js"; // Import the User model

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

// Generate posts for a given sellerId
const generatePosts = (sellerId, postCount) => {
  return Array.from({ length: postCount }, (_, index) => ({
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
};

async function seedDatabase() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Clearing existing posts...");
    await Post.deleteMany({});
    console.log("Clearing existing users...");
    await User.deleteMany({});

    const userCount = 5; // Number of users to create
    const postsPerUser = 6; // Number of posts per user

    const users = [];
    for (let i = 0; i < userCount; i++) {
      const user = new User({
        username: `user${i + 1}`,
        password: `password${i + 1}`, // Make sure to hash passwords in a real application
        location: {
          city: locations[Math.floor(Math.random() * locations.length)],
          state: "Yangon Region", // You can modify this as needed
        },
        contactInfo: {
          email: `user${i + 1}@example.com`,
          phone: generatePhoneNumber(),
        },
        miscellaneous: "Some additional info",
      });

      const savedUser = await user.save();
      console.log("User created with ID:", savedUser.id);
      users.push(savedUser);
    }

    console.log("Generating posts...");
    const allPosts = [];
    for (const user of users) {
      const posts = generatePosts(user._id, postsPerUser);
      allPosts.push(...posts);
    }

    console.log("Inserting new posts...");
    const result = await Post.insertMany(allPosts);
    console.log(`${result.length} posts inserted successfully!`);
  } catch (error) {
    console.error("Error seeding database:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed.");
  }
}

seedDatabase();
