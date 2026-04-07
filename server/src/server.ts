import authApp from '@/controller/user/AuthController';
import { Hono } from 'hono';
import mongoose from 'mongoose';
// import { config } from 'dotenv';

// config();

const server = new Hono();

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("Failed to connect to mongodb", err);
  });

server.get("/", (c) => {
  return c.json({ message: "Welcome to Bookworm" });
});
server.route("/auth", authApp);
// app.route('/books');
// app.route("/annotation")
// app.route("/progress")

export default server;
