import { findUser } from "@/services/user/UserService";
import { Hono } from "hono";

const userApp = new Hono<{ Variables: { user_id: string; }; }>();

userApp.get("/me", async (c) => {
  const user_id = c.get("user_id");

  const { messaage, user } = await findUser(user_id);

  return c.json({ messaage, user }, 200);
});

export { userApp };
