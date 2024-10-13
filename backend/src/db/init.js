import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL;
  mongoose
    .connect(DATABASE_URL)
    .then(console.info("Mongo connected"))
    .catch((err) => {
      console.error("mongo failed to connect: " + err);
    });
}
