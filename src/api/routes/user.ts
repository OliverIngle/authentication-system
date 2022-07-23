import { Router } from "express";
import { createNewUser, login } from "../controllers/userController";

let router = Router()

router.post('/login', login);
router.post('/signup', createNewUser);

export default router;