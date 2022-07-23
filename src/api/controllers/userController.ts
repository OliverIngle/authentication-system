import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import User from "../models/User";
import {
    hash,
    compare,
    genAccessToken,
    genRefreshToken,
    genTokenPayload,
    TokenInfo
} from "../helpers";

declare global {
    namespace Express {
        interface Request {
            tokenInfo: TokenInfo;
        }
    }
}




function createNewUser(req: Request, res: Response) {
    let { username, password } = req.body;
    if ( !(username && password) ) {
        return res
            .status(400)
            .send("Fields missing.")
    }

    let passwordHash = hash(password);

    if ( !User.save(new User(username, passwordHash)) ) {
        return res
            .status(400)
            .send("username already taken.")
    }

    res
        .status(200)
        .send("Successfull creation.");
}




function login(req: Request, res: Response) {
    let { username, password } = req.body;
    if ( !(username && password) ) {
        return res
            .status(400)
            .send("Fields missing.")
    }
    let user: User;
    try {
        user = User.findOne(username);
    } catch(err) {
        return res
            .status(500)
            .send((err as Error).message)
    }
    if (!compare(user.passwordHash, password)) {
        return res
            .status(405)
            .send("Login failed.")
    }
    let payload = genTokenPayload(user);
    let accessToken = genAccessToken(payload);
    let refreshToken = genRefreshToken(payload);
    res
        .status(200)
        .json({
            message: "Successfull login.",
            accessToken,
            refreshToken,
        });  
}



export {
    createNewUser,
    login,
}