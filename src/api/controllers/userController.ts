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
import { deleteToken, pushRefreshToken, refreshTokenExists } from "../models/RefreshTokenStore";
import { verifyRefreshTokenAndGetInfo } from "../helpers/authHelpers";

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
    pushRefreshToken(refreshToken);
    res
        .status(200)
        .json({
            message: "Successfull login.",
            accessToken,
            refreshToken,
        });  
}




function getNewAccessToken(req: Request, res: Response) {
    let { refreshToken } = req.body;
    if ( !refreshToken ) return res
        .status(400)
        .send("Refresh token missing.");
    if ( !refreshTokenExists(refreshToken) ) return res
        .status(400)
        .send("Refresh token not found.");
    let [passedVerification, tokenInfo] = verifyRefreshTokenAndGetInfo(refreshToken);
    if ( !(passedVerification && tokenInfo) ) return res
        .status(403)
        .send("Invalid refresh token.");
    let user = User.findOne(tokenInfo.name);
    let payload = genTokenPayload(user);
    let accessToken = genAccessToken(payload);
    res.status(201).json({
        message: "token accepted.",
        accessToken,
    })
}




function logout(req: Request, res: Response) {
    let { refreshToken } = req.body;
    if ( !refreshToken ) return res
        .status(400)
        .send("Refresh token missing.");
    deleteToken(refreshToken);
    res.status(203).send("Token successfully deleted.")
}




export {
    createNewUser,
    login,
    logout,
    getNewAccessToken,
}