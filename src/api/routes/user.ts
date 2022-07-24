import { Router } from "express";
import { createNewUser, getNewAccessToken, login } from "../controllers/userController";

let router = Router()

router.post('/login', login);
router.post('/signup', createNewUser);
router.post('/token', getNewAccessToken);

export default router;