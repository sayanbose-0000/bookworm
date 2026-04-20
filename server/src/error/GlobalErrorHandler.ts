import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";

const globalErrorHandler = (err: Error, c: Context) => {
  let status: ContentfulStatusCode = 500;
  let message = "Internal Server Error";
  let moreInfo = undefined;
  let typeOfError = "Server error";

  // Handling Http Errors
  if (err instanceof HTTPException) {
    status = err.status;
    message = err.message;
    typeOfError = "Http Error";
  }

  // Handling Zod Validation errors
  else if (err.name === "ZodError" || (err as any).issues) {
    status = 400;
    message = "Input validation failed";
    moreInfo = (err as any).issues || (err as any).errors;
    typeOfError = "Input Validation Error (Zod)";
  }

  // Handling Mongoose Validation errors
  else if (err.name === "ValidationError") {
    status = 400;
    const mongooseErrors = (err as any).errors;
    moreInfo = Object.values(mongooseErrors)
      .map((val: any) => val.message);

    message = moreInfo[0] || "Database validation failed";
    typeOfError = "Database validation error";
  }

  console.error(`>>> ERROR OCCURED: Error detected in ${c.req.method} request to ${c.req.path}`);
  console.error(`>>> ERROR MESSAGE: ${message}`);
  console.error(`>>> ERROR TYPE: ${typeOfError}\n`);
  console.error(err);

  return c.json({
    success: false,
    typeOfError,
    message,
    moreInfo  
  }, status);
};

export { globalErrorHandler };
