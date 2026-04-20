import { getAnnotation, saveAnnotation } from "@/services/annotation/AnnoteService";
import { IAnnoteCreateInput } from "@/validations/annotation/AnnoteZod";
import { Hono } from "hono";

const annoteApp = new Hono<{ Variables: { user_id: string; }; }>();

annoteApp.post("/save/:bookId", async (c) => {
  const { bookId } = c.req.param();
  const user_id = c.get("user_id");
  const body = await c.req.json<IAnnoteCreateInput>();

  const { message, annotation } = await saveAnnotation(user_id, bookId, body);

  return c.json({ message, annotation }, 201);
});

annoteApp.get("/:bookId", async (c) => {
  const { bookId } = c.req.param();

  const { message, annotations } = await getAnnotation(bookId);

  return c.json({ message, annotations }, 201);
});

export default annoteApp;
