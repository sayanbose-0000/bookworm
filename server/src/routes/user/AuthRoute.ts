import { login, refresh, register } from "@/services/user/AuthService";
import { IAuthLoginInput, IAuthRefreshInput, IAuthRegisterInput } from "@/validations/user/AuthZod";
import { Hono } from "hono";

const authApp = new Hono();

authApp.post("/register", async (c) => {
  const body = await c.req.json<IAuthRegisterInput>();
  const result = await register(body);

  return c.json(result, 201);
});

authApp.post("/login", async (c) => {
  const body = await c.req.json<IAuthLoginInput>();
  const result = await login(body);

  return c.json(result, 200);
});

authApp.post("/refresh", async (c) => {
  const body = await c.req.json<IAuthRefreshInput>();
  const result = await refresh(body);

  return c.json(result, 200);
});

export default authApp;
