import { IAnnoteTypeEnum } from "@/types/enums/IAnnoteTypeEnum";
import * as zod from "zod/mini";

const AnnoteCreateZodSchema = zod.object({
  annote_type: zod.enum(IAnnoteTypeEnum, { error: "Annotation type must be either Highlight, Note or Bookmark" }),
  selected_text: zod.string({ error: "The selected text must be a string" }),
  cfi_position: zod.string({ error: "The selected text must be a string" }),
});

type IAnnoteCreateInput = zod.infer<typeof AnnoteCreateZodSchema>;

export { AnnoteCreateZodSchema };
export type { IAnnoteCreateInput };
