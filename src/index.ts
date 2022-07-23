import express from "express";
import 'dotenv/config';
import postRouter from './api/routes/posts';
import userRouter from './api/routes/user';
import { authorizeToken } from "./api/middleware";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/posts', authorizeToken, postRouter);
app.use('/', userRouter);


app.listen(PORT);