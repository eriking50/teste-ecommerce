import { HttpError } from "./Base.error";

export class ValidationError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}