import { IReadProgress } from "@/types/models/readprogress/IReadProgress";
import { model, Model, models, Schema, SchemaDefinition, Types } from "mongoose";

const readProgressDef = {
  user_id: {
    type: Types.ObjectId,
    required: [true, "User id is required"],
  },

  book_id: {
    type: Types.ObjectId,
    required: [true, "Book id is required"],
  },

  cfi_position: {
    type: String,
    required: [true, "Cfi position is required"],
  }
} satisfies SchemaDefinition<IReadProgress>;

const ReadProgressSchema = new Schema(readProgressDef, { timestamps: true });

const ReadProgressModel: Model<IReadProgress> = (
  models["_bookworm_read_progress"] as Model<IReadProgress> ||
  model<IReadProgress>("_bookworm_read_progress", ReadProgressSchema)
);

export default ReadProgressModel;
