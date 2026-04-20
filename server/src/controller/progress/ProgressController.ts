import { getProgress, getProgressAll, saveProgress } from "@/services/progress/ProgressService";
import { IProgressCreateInput } from "@/validations/progess/ProgressZod";
import { Hono } from "hono";

const progressApp = new Hono<{ Variables: { user_id: string; }; }>();

progressApp.post("/:bookId", async (c) => {
  const { bookId } = c.req.param();
  const user_id = c.get("user_id");
  const body = await c.req.json<IProgressCreateInput>();

  const { message, progress } = await saveProgress(user_id, bookId, body);

  return c.json({ message, progress }, 201);
});


progressApp.get("/all", async (c) => {
  const user_id = c.get("user_id");

  const { message, progresses } = await getProgressAll(user_id);

  return c.json({ message, progresses }, 200);
});

progressApp.get("/:bookId", async (c) => {
  const { bookId } = c.req.param();

  const { message, progress } = await getProgress(bookId);

  return c.json({ message, progress }, 200);
});


export default progressApp;
