import express from "express";
import postsRoutes from "./routes/posts.js";

const app = express();
app.use("/api/v1/posts", postsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
