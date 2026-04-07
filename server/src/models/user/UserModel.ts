import { IUserSchema } from "@/types/models/user/IUserSchema";
import { IUserSubscriptions } from "@/types/models/user/IUserSubscriptions";
import { model, Model, models, Schema, SchemaDefinition } from "mongoose";

const userSchemaDef = {
  displayname: {
    type: String,
    required: [true, "Username is required"],
    // unique: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  subscription: {
    type: new Schema<IUserSubscriptions>({
      plan: {
        type: String,
        default: "free",
      },

      expiresAt: {
        type: Date,
        default: null,
      },
    }),
  },
} satisfies SchemaDefinition<IUserSchema>;

const UserSchema = new Schema(userSchemaDef, { timestamps: true });

const UserModel: Model<IUserSchema> = (
  models["_bookworm_users"] as Model<IUserSchema> ||
  model<IUserSchema>("_bookworm_users", UserSchema)
)

export default UserModel;
