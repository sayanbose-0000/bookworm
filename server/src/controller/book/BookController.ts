import { createBook, downloadBookById, findBooks } from "@/services/book/BookService";
import { IBookCreateInput } from "@/validations/book/BookZod";
import { Hono } from "hono";

const bookApp = new Hono<{ Variables: { user_id: string; }; }>();

// upload a book
bookApp.post("/upload", async (c) => {
  const body: IBookCreateInput = await c.req.parseBody();
  const user_id = c.get("user_id");

  const { message, book } = await createBook(body, user_id);

  return c.json({ message, book }, 201);
});

// get all books
bookApp.get("/", async (c) => {
  const user_id = c.get("user_id");

  const { message, books } = await findBooks(user_id);

  return c.json({ message, books }, 200);
});

// get a particular book
bookApp.get("/:bookId", async (c) => {
  const { bookId } = c.req.param();
  const user_id = c.get("user_id");

  const { message, book } = await downloadBookById(bookId, user_id);

  return c.json({ message, book }, 200);
});

export default bookApp;
