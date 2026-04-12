import authApp from '@/controller/user/AuthController';
import { authMiddleware } from '@/middleware/AuthMiddleware';
import { Context, Hono, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import mongoose from 'mongoose';
import bookApp from './controller/book/BookController';

const server = new Hono();

server.onError((err, c) => {
  // HTTPException Errors
  if (err instanceof HTTPException) {
    return c.json({
      message: err.message
    }, err.status);
  }

  // Generic errors
  return c.json({
    message: "Internal Server Error"
  }, 500);
});

const mongoUri = Bun.env.MONGO_URI || "";
mongoose.connect(mongoUri).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.log("Failed to connect to mongodb", err);
});

server.get("/", (c) => {
  return c.json({ message: "Welcome to Bookworm" });
});

// Middleware
// server.use("*", authMiddleware);
server.use("*", async (c: Context, next: Next) => {
  if (c.req.path.startsWith("/auth")) {
    return next();
  }

  return authMiddleware(c, next);
});

server.route("/auth", authApp);
server.route("/books", bookApp);
// app.route("/annotation")
// app.route("/progress")

export default server;
