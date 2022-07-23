import { Router } from "express";
import { getPosts, newPost } from "../controllers/postController"

let router = Router();

router.get("/", getPosts);
router.post("/new", newPost);

export default router;