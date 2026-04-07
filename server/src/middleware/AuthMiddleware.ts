import { IAuthVariables } from "@/types/middleware/IAuthVariables";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";

const authMiddleware = createMiddleware<{ Variables: IAuthVariables; }>(async (c, next) => {
  const authHeader = c.req.header("Authorization"); // Authorization header is of format 'Bearer <token>'
  if (!authHeader?.startsWith("Bearer")) {
    throw new HTTPException(401, { message: "Unauthorized: Missing or Invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await verify(token, process.env.JWT_ACCESS_SECRET as string, "HS256") as { userId: string; };
    
    c.set("user_id", payload.userId); // sets user_id in hono's context other routes can access it using c.get("user_id")

    await next();
  } catch (err) {
    throw new HTTPException(401, { message: "Unauthorized: Invalid or Expired token" });
  }
});

export { authMiddleware };
