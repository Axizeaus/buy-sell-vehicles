// const mongoose = require("mongoose");
import mongoose from "mongoose";

export async function initDatabase() {
  const DATABASE_URL = "mongodb://localhost:27017/blog";
  mongoose
    .connect(DATABASE_URL)
    .then(console.info("Mongo connected"))
    .catch((err) => {
      console.error("mongo failed to connect: " + err);
    });
}

// exports.initDatabase = initDatabase;
