import * as zod from "zod/mini";

const MAX_SIZE = 25000000;

const checkFileType = (file: File) => {
  if (file?.name) {
    const fileType = file.name.split("")[1];
    return fileType === "epub";
  }

  return false;
};

const BookCreateZodSchema = zod.object({
  file: zod.any()
    .check(
      zod.refine((file: File) => file?.size > 0, // use refine to make custom validation logic
        { error: "File is required" }),
      zod.refine((file: File) => file?.size > MAX_SIZE,
        { error: "Max file size is 25mb" }),
      zod.refine((file: File) => checkFileType(file),
        { error: "Only epub files are allowed" })
    )
});

type IBookCreateInput = zod.infer<typeof BookCreateZodSchema>;

export { BookCreateZodSchema };
export type { IBookCreateInput };
