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
    }, { _id: false }),
  },
} satisfies SchemaDefinition<IUserSchema>;

const UserSchema = new Schema(userSchemaDef, {
  timestamps: true,
  toJSON: {  // used as a mapper, makes sure certain fields are ommitted out
    transform(doc, ret) { // ret is returned obj (contains the fields), doc is the document (contains save, find etc)
      const { _id, __v, password, ...rest } = ret;
      return { id: _id, ...rest };
    }
  }
});


const UserModel: Model<IUserSchema> = (
  models["_bookworm_users"] as Model<IUserSchema> ||
  model<IUserSchema>("_bookworm_users", UserSchema)
);

export default UserModel;
