import { HTTPException } from "hono/http-exception";

const validateInputWithZod = async<T>(schema: any, data: T) => {
  const parsedInput = await schema.safeParseAsync(data);

  if (!parsedInput.success) {
    throw new HTTPException(400, { message: `${parsedInput.error.issues[0].message }` });
  }

  return parsedInput.data as T;
};

export { validateInputWithZod };
