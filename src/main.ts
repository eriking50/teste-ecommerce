import { config } from 'dotenv';
import morgan from 'morgan';
import express from 'express'
import { Router, Request, Response } from 'express';

const app = express();

config()

app.use(morgan('dev'));

const route = Router()

app.use(express.json())

app.use(route)

const port = process.env.PORT || 3000

app.listen(port, () => `Server Listening in port ${port}`)

