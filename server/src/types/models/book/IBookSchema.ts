import { Types } from "mongoose";
import { IBookMetaData } from "./IBookMetaData";

interface IBookSchema {
  user_id: Types.ObjectId;
  metadata: IBookMetaData;
  storage_url: string;
}

export { IBookSchema };
