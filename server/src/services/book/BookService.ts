import { validateInputWithZod } from "@/helper/validation/validateInput";
import BookModel from "@/models/book/BookModel";
import { BookCreateZodSchema, IBookCreateInput } from "@/validations/book/BookZod";
import ImageKit from "@imagekit/nodejs";
import { HTTPException } from "hono/http-exception";

const createBook = async (data: IBookCreateInput, user_id: string) => {
  const validatedData = await validateInputWithZod(BookCreateZodSchema, data);
  const { file, title, author, cover } = validatedData;

  const client = new ImageKit({
    privateKey: Bun.env.IMAGEKIT_PRIVATE_KEY,
  });

  const fileUploadResponse = await client.files.upload({
    file,
    fileName: file.name,
    folder: "bookworm"
  });

  const coverUploadResponse = await client.files.upload({
    file: cover,
    fileName: file.name + "_cover",
    folder: "bookworm"
  });

  if (!fileUploadResponse) {
    throw new HTTPException(500, { message: "Failed to upload book" });
  }

  const bookData = await BookModel.create({
    user_id,
    storage_url: fileUploadResponse.filePath,
    metadata: {
      title,
      author,
      cover_url: coverUploadResponse.filePath,
    }
  });

  return { message: "Book created successfully", book: bookData };
};

const findBooks = async ( user_id: string) => {
  const books = await BookModel.find({ user_id });

  return { message: "Books fetched successfully", books };
};

export { createBook, findBooks };
