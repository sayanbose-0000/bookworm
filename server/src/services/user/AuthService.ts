import { validateInputWithZod } from "@/helper/validation/validateInput";
import { getExp1Hour, getExp7Days } from "@/models/constants/JwtExpiry";
import UserModel from "@/models/user/UserModel";
import {
  AuthLoginZodSchema, AuthRefreshZodSchema, AuthRegisterZodSchema,
  IAuthLoginInput, IAuthRefreshInput, IAuthRegisterInput
} from "@/validations/user/AuthZod";
import { HTTPException } from "hono/http-exception";
import { sign, verify } from "hono/jwt";

const register = async (data: IAuthRegisterInput) => {
  const { displayname, email, password } = await validateInputWithZod(AuthRegisterZodSchema, data); // reassign parsed values to them

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new HTTPException(409, { message: `User with email: ${email} already exists` });
  }

  const hashedPassword = await Bun.password.hash(password);
  const createdUser = await UserModel.create({ email, password: hashedPassword, displayname });

  return { message: `User with displayname: ${createdUser.displayname} created successfully` };
};

const login = async (data: IAuthLoginInput) => {
  const { email, password } = await validateInputWithZod(AuthLoginZodSchema, data);

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new HTTPException(404, { message: `User with email ${email} not found` });
  }

  const valid = await Bun.password.verify(password, user.password);

  if (!valid) {
    throw new HTTPException(401, { message: "Email or Password is invalid" });
  }

  const accessToken = await sign({
    userId: user._id,
    exp: getExp1Hour()
  }, process.env.JWT_ACCESS_SECRET as string);

  const refreshToken = await sign({
    userId: user._id,
    exp: getExp7Days()
  }, process.env.JWT_REFRESH_SECRET as string);

  return { message: { accessToken, refreshToken } };
};

const refresh = async (data: IAuthRefreshInput) => {
  const { refreshToken } = await validateInputWithZod(AuthRefreshZodSchema, data);

  try {
    const payload = await verify(refreshToken, process.env.JWT_REFRESH_SECRET as string, "HS256") as { userId: string; };

    const newAccessToken = await sign({
      userId: payload.userId,
      exp: getExp1Hour()
    }, process.env.JWT_ACCESS_SECRET as string);

    const newRefreshToken = await sign({
      userId: payload.userId,
      exp: getExp7Days()
    }, process.env.JWT_REFRESH_SECRET as string);

    return { message: { accessToken: newAccessToken, refreshToken: newRefreshToken } };
  } catch (err) {
    throw new HTTPException(401, { message: "Unauthorized: Invalid or Expired token" });
  }
};

export { login, refresh, register };
