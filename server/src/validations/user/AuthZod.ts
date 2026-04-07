import * as zod from "zod/mini";

const AuthRegisterZodSchema = zod.object({
  displayname: zod.string({ error: "Display Name is required" })
    .check(
      zod.trim(),
      zod.minLength(3, { error: "Display name must be atleast 3 chars long" }),
      zod.maxLength(20, { error: "Display name can't be more than 20 chars" })
    ),

  email: zod.email({ pattern: zod.regexes.browserEmail, error: "Please enter a valid email" })
    .check(
      zod.trim(),
      zod.toLowerCase()
    ),

  password: zod.string({ error: "Please enter a valid password" })
    .check(
      zod.trim(),
      zod.minLength(3, { error: "Password must be atleast 3 chars long" }),
    )
});

const AuthLoginZodSchema = zod.object({
  email: zod.email({ pattern: zod.regexes.browserEmail, error: "Please enter a valid email" })
    .check(
      zod.trim(),
      zod.toLowerCase()
    ),

  password: zod.string({ error: "Please enter a valid password" })
    .check(
      zod.trim(),
      zod.minLength(3, { error: "Password must be atleast 3 chars long" }),
    )
}, { error: "Email and Password are required" });

const AuthRefreshZodSchema = zod.object({
  refreshToken: zod.string({ error: "Please enter a valid refresh token" })
    .check(
      zod.trim(),
    )
}, { error: "Refresh Token must be provided" });

type IAuthLoginInput = zod.infer<typeof AuthLoginZodSchema>;
type IAuthRegisterInput = zod.infer<typeof AuthRegisterZodSchema>;
type IAuthRefreshInput = zod.infer<typeof AuthRefreshZodSchema>;

export { AuthLoginZodSchema, AuthRefreshZodSchema, AuthRegisterZodSchema };
export type { IAuthLoginInput, IAuthRefreshInput, IAuthRegisterInput };
