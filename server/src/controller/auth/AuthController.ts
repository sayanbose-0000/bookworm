import { setCookiesInBrowser } from "@/helper/auth/setCookie";
import { login, refresh, register } from "@/services/auth/AuthService";
import { IAuthLoginInput, IAuthRegisterInput } from "@/validations/user/AuthZod";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";

const authApp = new Hono();

authApp.post("/register", async (c) => {
  const body = await c.req.json<IAuthRegisterInput>();
  const { message, user, accessToken, refreshToken } = await register(body);

  setCookiesInBrowser({ c, token: accessToken, typeOfToken: "accessToken" });
  setCookiesInBrowser({ c, token: refreshToken, typeOfToken: "refreshToken" });

  return c.json({ message, user }, 201);
});

authApp.post("/login", async (c) => {
  const body = await c.req.json<IAuthLoginInput>();
  const { message, user, accessToken, refreshToken } = await login(body);

  setCookiesInBrowser({ c, token: accessToken, typeOfToken: "accessToken" });
  setCookiesInBrowser({ c, token: refreshToken, typeOfToken: "refreshToken" });

  return c.json({ message, user }, 200);
});

authApp.post("/refresh", async (c) => {
  const refreshTokenCookie: string = getCookie(c, "refreshToken") || "";
  const { message, accessToken, refreshToken } = await refresh({ refreshToken: refreshTokenCookie });

  setCookiesInBrowser({ c, token: accessToken, typeOfToken: "accessToken" });
  setCookiesInBrowser({ c, token: refreshToken, typeOfToken: "refreshToken" });

  return c.json({ message }, 200);
});

export default authApp;
