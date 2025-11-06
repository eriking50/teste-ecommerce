import { config } from 'dotenv';
import morgan from 'morgan';
import express from 'express'
import routes from './api/register.routes';
import { ExceptionHandler } from './infrastructure/exceptions/exception.handler';
import { validateEnvs } from './shared/utils/env.util';
import { RateLimiter } from './infrastructure/midlewares/RateLimiter.midleware';

const app = express();

config()

validateEnvs()

app.use(morgan('dev'));

app.use(express.json())

app.use(routes)

app.use(ExceptionHandler)

app.use(RateLimiter)

const port = process.env.PORT || 3000

app.listen(port, () => `Server Listening in port ${port}`)
