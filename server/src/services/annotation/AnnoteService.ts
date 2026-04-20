import { validateInputWithZod } from "@/helper/validation/validateInput";
import { AnnoteModel } from "@/models/annotation/AnnoteModel";
import { AnnoteCreateZodSchema, IAnnoteCreateInput } from "@/validations/annotation/AnnoteZod";

const saveAnnotation = async (user_id: string, book_id: string, data: IAnnoteCreateInput) => {
  const { annote_type, cfi_position, selected_text } = await validateInputWithZod(AnnoteCreateZodSchema, data);

  const annoteData = await AnnoteModel.create({
    user_id,
    book_id,
    annote_type,
    selected_text,
    cfi_position
  });

  return { message: "Annotation created successfully", annotation: annoteData };
};

const getAnnotation = async (book_id: string) => {
  const annoteData = await AnnoteModel.find({ book_id });

  return { message: "Annotation fetched successfully", annotations: annoteData };
};

export { getAnnotation, saveAnnotation };
