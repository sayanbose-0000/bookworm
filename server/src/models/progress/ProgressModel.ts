import { IProgress } from "@/types/models/readprogress/IReadProgress";
import { model, Model, models, Schema, SchemaDefinition, Types } from "mongoose";

const progressDef = {
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
} satisfies SchemaDefinition<IProgress>;

const ProgressSchema = new Schema(progressDef, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      const { _id, __v, ...rest } = ret;
      return { id: _id, ...rest };
    }
  }
});

const ProgressModel: Model<IProgress> = (
  models["_bookworm_read_progress"] as Model<IProgress> ||
  model<IProgress>("_bookworm_read_progress", ProgressSchema)
);

export default ProgressModel;
