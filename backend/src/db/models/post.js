import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle"],
    },
    year: {
      type: Number,
      required: true,
      min: 1886,
      max: new Date().getFullYear(),
    },
    mileage: { type: Number, min: 0 },
    location: { type: String, required: true },
    contactInfo: { type: String, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", postSchema);
