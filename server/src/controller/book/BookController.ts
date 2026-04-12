import { createBook, findBooks } from "@/services/book/BookService";
import { IBookCreateInput } from "@/validations/book/BookZod";
import { Hono } from "hono";

const bookApp = new Hono<{ Variables: { user_id: string } }>();

bookApp.post("/upload", async (c) => {
  const body: IBookCreateInput = await c.req.parseBody();
  const user_id = c.get("user_id");

  const result = await createBook(body, user_id);
  
  return c.json({ message: result.message, book: result.book }, 201);
});

bookApp.get("/", async (c) => {
  const user_id = c.get("user_id");

  const result = await findBooks(user_id);

  return c.json({ message: result.message, books: result.books }, 200);
});

export default bookApp;
