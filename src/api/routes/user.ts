import { Router } from "express";
import { createNewUser, getNewAccessToken, login, logout } from "../controllers/userController";

let router = Router()

router.post('/login', login);
router.post('/signup', createNewUser);
router.post('/token', getNewAccessToken);
router.delete('/logout', logout);

export default router;