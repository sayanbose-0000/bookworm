import { IUserSubscriptions } from "./IUserSubscriptions";

interface IUserSchema {
  email: string;
  displayname: string;
  password: string;
  subscription: IUserSubscriptions;
}

export { IUserSchema };
