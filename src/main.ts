import { config } from 'dotenv';
import morgan from 'morgan';
import express from 'express'
import routes from './api/register.routes';
import { ExceptionHandler } from './infrastructure/exceptions/exception.handler';

const app = express();

config()

app.use(morgan('dev'));

app.use(express.json())

app.use(routes)

app.use(ExceptionHandler)

const port = process.env.PORT || 3000

app.listen(port, () => `Server Listening in port ${port}`)
