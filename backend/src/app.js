import express from "express";
import postsRoutes from "./routes/posts.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/posts", postsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
