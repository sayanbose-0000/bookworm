import { validateInputWithZod } from "@/helper/validation/validateInput";
import ProgressModel from "@/models/progress/ProgressModel";
import { IProgressCreateInput, ProgressCreateZodSchema } from "@/validations/progess/ProgressZod";

const saveProgress = async (user_id: string, book_id: string, data: IProgressCreateInput) => {
  const { cfi_position } = await validateInputWithZod(ProgressCreateZodSchema, data);

  const progressData = await ProgressModel.findOneAndUpdate(
    { user_id, book_id },
    { $set: { cfi_position } },
    {
      new: true, // returns updated document, not old one
      upsert: true, // if no document matches, create a new one
      runValidators: true // validate schema while updating
    }
  );


  return { message: "Progress created successfully", progress: progressData };
};

const getProgress = async (book_id: string) => {
  const progressData = await ProgressModel.findOne({ book_id });

  return { message: "Progress fetched successfully", progress: progressData };
};

const getProgressAll = async (user_id: string) => {  
  const progressData = await ProgressModel.find({ user_id });

  return { message: "Progress fetched successfully", progresses: progressData };
};

export { getProgress, getProgressAll, saveProgress };
