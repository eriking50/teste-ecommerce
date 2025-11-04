import express from 'express'
import { BaseDTOValidator } from 'src/shared/interfaces/base.dto';

type BaseValidatorClass =  new (body: Record<string, any>) => BaseDTOValidator

export const ValidationMidleware = (validator: BaseValidatorClass) => {
  return (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    new validator(req.body).validate();

    next();
  };
}