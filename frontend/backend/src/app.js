import express from "express";
import cors from "cors";

import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/user", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
