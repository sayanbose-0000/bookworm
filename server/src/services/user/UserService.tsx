import UserModel from "@/models/user/UserModel";
import { HTTPException } from "hono/http-exception";

const findUser = async (user_id: string) => {
  const userDoc = await UserModel.findById(user_id);
  if (!userDoc) {
    throw new HTTPException(404, { message: "User not found" });
  }

  return { messaage: "User fetched successfully", user: userDoc };
};

export { findUser };
