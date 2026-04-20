import authApp from '@/controller/auth/AuthController';
import { authMiddleware } from '@/middleware/AuthMiddleware';
import { Context, Hono, Next } from 'hono';
import mongoose from 'mongoose';
import annoteApp from './controller/annotation/AnnoteController';
import bookApp from './controller/book/BookController';
import progressApp from './controller/progress/ProgressController';
import { userApp } from './controller/user/UserController';
import { globalErrorHandler } from './error/GlobalErrorHandler';

const server = new Hono();

// Global error handler i,plemented
server.onError(globalErrorHandler);

const mongoUri = Bun.env.MONGO_URI || "";

mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.log("Failed to connect to mongodb", err);
  });


// Middleware implemented
server.use("*", async (c: Context, next: Next) => {
  if (c.req.path.startsWith("/auth")) {
    return next();
  }

  return authMiddleware(c, next);
});

server.get("/", (c) => {
  return c.json({ message: "Welcome to Bookworm" });
});

server.route("/auth", authApp);
server.route("/books", bookApp);
server.route("/user", userApp);
server.route("/annote", annoteApp);
server.route("/progress", progressApp);

export default server;
