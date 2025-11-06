import express from 'express'
import { HttpError } from 'src/shared/errors/Base.error'

const TEST_TOKEN = process.env.TEST_TOKEN

export const AuthenticationMidleware = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization

  if (!TEST_TOKEN || token !== TEST_TOKEN) {
    throw new HttpError(401, 'Unauthorized')
  }

  next();
}