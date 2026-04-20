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
    folder: "bookworm/ebooks"
  });  

  const coverUploadResponse = await client.files.upload({
    file: cover,
    fileName: file.name.split(".")[0] + ".img",
    folder: "bookworm/covers"
  });

  if (!fileUploadResponse) {
    throw new HTTPException(500, { message: "Failed to upload book" });
  }

  if (!coverUploadResponse) {
    // throw new HTTPException(500, { message: "Failed to upload book" });
    console.log("Failed to upload image")
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

const findBooks = async (user_id: string) => { // TODO: Fetch the respective covers
  const books = await BookModel.find({ user_id });

  return { message: "Books fetched successfully", books };
};

const downloadBookById = async (book_id: string, user_id: string) => {
  const bookDoc = await BookModel.findById(book_id);

  if (!bookDoc) {
    throw new HTTPException(404, { message: `Book with id ${book_id} not found` });
  }

  if (!bookDoc.user_id.equals(user_id)) {
    throw new HTTPException(403, { message: `You don't have permission to access this resource` });
  }

  // const client = new ImageKit({
  //   privateKey: Bun.env.IMAGEKIT_PRIVATE_KEY,
  // });

  // const book = await client.files.get(bookDoc.id);

  return { message: "Book fetched successfully", book: bookDoc };
};

export { createBook, downloadBookById, findBooks };
