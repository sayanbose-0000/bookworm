import * as zod from "zod/mini";

const ProgressCreateZodSchema = zod.object({
  cfi_position: zod.string({ error: "The selected text must be a string" }),
});

type IProgressCreateInput = zod.infer<typeof ProgressCreateZodSchema>;

export { ProgressCreateZodSchema };
export type { IProgressCreateInput };
