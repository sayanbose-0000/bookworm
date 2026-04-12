import * as zod from "zod/mini";

const BookCreateZodSchema = zod.object({
  file: zod.file()
    .check(
      zod.refine((file: File) => file?.size > 0, // use refine to make custom validation logic
        { error: "File is required" }),
      zod.refine((file: File) => file?.size <= 25000000, // 25 mb
        { error: "Max file size is 25mb" }),
      zod.refine((file: File) => file.name.endsWith(".epub"),
        { error: "Only epub files are allowed" })
    ),

  title: zod.string({ error: "Please enter a valid title" })
    .check(
      zod.trim(),
      zod.minLength(3, { error: "Title must be at least 3 characters long" }),
    ),

  author: zod.string({ error: "Please enter a valid author" })
    .check(
      zod.trim(),
      zod.minLength(3, { error: "Author name must be at least 3 characters long" }),
    ),

  cover: zod.file()
    .check(
      // not checking if cover image is provided or not as many epubs don't have it
      zod.refine((file: File) => file?.size <= 25000000, // 25 mb
        { error: "Max file size is 25mb" }),
      zod.refine((file: File) => file.name.endsWith(".epub") || file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") || file.name.endsWith(".png") || file.name.endsWith(".webp"),
        { error: "Only epub and image files are allowed" })
    )
});

type IBookCreateInput = zod.infer<typeof BookCreateZodSchema>;

export { BookCreateZodSchema };
export type { IBookCreateInput };
