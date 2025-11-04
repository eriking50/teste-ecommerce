import express from 'express'
import { HttpError } from "src/shared/errors/Base.error"

const validateError = (err: any) => {
  if (err instanceof HttpError) {
    return err
  }

  console.error(err);

  return new HttpError(500, 'Internal Server Error')
}

export const ExceptionHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }

  const error = validateError(err)

  const statusCode = error.statusCode

  const body = {
    message: error.message,
    status: error.statusCode
  }

  res.status(statusCode).send(body)
}