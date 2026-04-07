import { login, refresh, register } from "@/services/user/AuthService";
import { IAuthLoginInput, IAuthRefreshInput, IAuthRegisterInput } from "@/validations/user/AuthZod";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";

const authApp = new Hono();

authApp.post("/register", async (c) => {
  const body = await c.req.json<IAuthRegisterInput>();
  const { message, accessToken, refreshToken } = await register(body);

  setCookie(c, "accessToken", accessToken, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "strict",
    secure: process.env.NODE_ENV !== "Development",
    maxAge: 60 * 60  // 1 hour
  });

  setCookie(c, "refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "strict",
    secure: process.env.NODE_ENV !== "Development",
    maxAge: 60 * 60 * 24 * 7  // 7 days
  });

  return c.json({ message }, 201);
});

authApp.post("/login", async (c) => {
  const body = await c.req.json<IAuthLoginInput>();
  const { message, accessToken, refreshToken } = await login(body);

  // instead of saving to localstorage (where the client has again to pack it in heaeder
  // and send it with adding "Bearer: <token>", we set it in cookie and then in client we do credentials: include
  // and the cookie will automatically injected in the code)
  setCookie(c, "accessToken", accessToken, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "strict",
    secure: process.env.NODE_ENV !== "Development",
    maxAge: 60 * 60  // 1 hour
  });

  setCookie(c, "refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "strict",
    secure: process.env.NODE_ENV !== "Development",
    maxAge: 60 * 60 * 24 * 7  // 7 days
  });

  return c.json({ message }, 200);
});

authApp.post("/refresh", async (c) => {
  const body = await c.req.json<IAuthRefreshInput>();
  const { message, accessToken, refreshToken } = await refresh(body);

  setCookie(c, "accessToken", accessToken, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "strict",
    secure: process.env.NODE_ENV !== "Development",
    maxAge: 60 * 60 // 1 hour
  });

  setCookie(c, "refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "strict",
    secure: process.env.NODE_ENV !== "Development",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return c.json({ message }, 200);
});

export default authApp;
