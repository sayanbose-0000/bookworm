import authApp from '@/controller/user/AuthController';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import mongoose from 'mongoose';


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

mongoose.connect(Bun.env.MONGO_URI as string).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
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
