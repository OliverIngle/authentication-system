import express from "express";
import 'dotenv/config';
import './config/connectDB';
import postRouter from './api/routes/posts';
import userRouter from './api/routes/user';
import { authorizeToken } from "./api/middleware";
import { errorHanler } from "./api/helpers";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/posts', authorizeToken, postRouter);
app.use('/', userRouter);
app.use(errorHanler);


app.listen(PORT, () => console.log('SUCCESS: App started.'));