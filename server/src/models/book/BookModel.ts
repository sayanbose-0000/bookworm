import { IBookMetaData } from "@/types/models/book/IBookMetaData";
import { IBookSchema } from "@/types/models/book/IBookSchema";
import { model, Model, models, Schema, SchemaDefinition, Types } from "mongoose";

const bookSchemaDef = {
  user_id: {
    type: Types.ObjectId,
    required: [true, "User Id is required for uploading book"],
  },

  storage_url: {
    type: String,
    required: [true, "Storage url is needed to upload a book"],
  },

  metadata: {
    type: new Schema<IBookMetaData>({
      title: {
        type: String,
        required: [true, "Title of book is required"],
      },
      author: {
        type: String,
        required: [true, "Author of book is required"],
      },
      cover_url: {
        type: String,
        required: [true, "Cover url of book is required"],
      },
    }, { _id: false }), // don't need id for internal one
  },
} satisfies SchemaDefinition<IBookSchema>;

const BookSchema = new Schema(bookSchemaDef, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      const { _id, __v, ...rest } = ret;
      return { id: _id, ...rest };
    }
  }
});

const BookModel: Model<IBookSchema> = (
  models["_bookworm_books"] as Model<IBookSchema> ||
  model<IBookSchema>("_bookworm_books", BookSchema)
);

export default BookModel;
