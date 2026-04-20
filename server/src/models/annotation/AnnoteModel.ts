import { IAnnoteTypeEnum } from "@/types/enums/IAnnoteTypeEnum";
import { IAnnoteSchema } from "@/types/models/annotation/IAnnoteSchema";
import { model, Model, models, Schema, SchemaDefinition, Types } from "mongoose";

const annoteSchemaDef = {
  user_id: {
    type: Types.ObjectId,
    required: [true, "User id is required"]
  },

  book_id: {
    type: Types.ObjectId,
    required: [true, "Book id is required"]
  },

  annote_type: {
    type: String,
    enum: Object.values(IAnnoteTypeEnum),
    required: [true, "Annotation type must be provided"],
  },

  selected_text: {
    type: String,
    required: [true, "Selected text must be provided"],
  },

  cfi_position: {
    type: String,
    required: [true, "Cfi position must be provided"]
  }
} satisfies SchemaDefinition<IAnnoteSchema>; // Satiesfies checks that your value matches the type (for autocomplete/validation), but doesn't change the variable's inferred type.

const AnnoteSchema = new Schema(annoteSchemaDef, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      const { _id, __v, ...rest } = ret;
      return { id: _id, ...rest };
    }
  }
});

const AnnoteModel: Model<IAnnoteSchema> = (
  models["_bookworm_annotations"] as Model<IAnnoteSchema> ||
  model<IAnnoteSchema>("_bookworm_annotations", AnnoteSchema)
);

export { AnnoteModel };
