import express from 'express'
import { HttpError } from 'src/shared/errors/Base.error'

const WEBHOOK_AUTHORIZATION_TOKEN = process.env.WEBHOOK_AUTHORIZATION_TOKEN

export const WebhookMidleware = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization

  if (!WEBHOOK_AUTHORIZATION_TOKEN || token !== WEBHOOK_AUTHORIZATION_TOKEN) {
    throw new HttpError(401, 'Unauthorized')
  }

  next();
}