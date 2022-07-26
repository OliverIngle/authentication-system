import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import User, { IUser } from "../models/User";
import {
    hash,
    compare,
    genAccessToken,
    genRefreshToken,
    genTokenPayload,
    TokenInfo,
    verifyRefreshTokenAndGetInfo,
} from "../helpers";
import RefreshTokenStore, { IRefreshToken } from "../models/RefreshTokenStore";





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
    let user: IUser = new User({
        name: username,
        passwordHash,
    });

    user
        .save()
        .then(doc => {
            res
                .status(201)
                .send("User succesfully created.");
        })
        .catch(err => {
            res
                .status(400)
                .send("User already exists.")
        })

}





async function login(req: Request, res: Response) {

    let { username, password } = req.body;
    if ( !(username && password) ) {
        return res
            .status(400)
            .send("Fields missing.")
    }

    let currentUser: IUser | null = await User.findOne({name: username });
    if (!currentUser) {
        return res
            .status(404)
            .send("User not found.")
    }

    if (!compare(currentUser.passwordHash, password)) {
        return res
            .status(401)
            .send("Incorrect password.")
    }

    let payload = genTokenPayload(currentUser);
    let accessToken = genAccessToken(payload);
    let refreshToken = genRefreshToken(payload);
    await RefreshTokenStore.create({ token: refreshToken, });
    res
        .status(201)
        .json({
            message: "Successfull login.",
            accessToken,
            refreshToken,
        });  
}





async function getNewAccessToken(req: Request, res: Response) {
    
    let { refreshToken } = req.body;
    if ( !refreshToken ) return res
        .status(400)
        .send("Refresh token field missing.");

    let [passedVerification, tokenInfo] = verifyRefreshTokenAndGetInfo(refreshToken);
    if ( !(passedVerification && tokenInfo) ) return res
        .status(401)
        .send("Invalid refresh token.");

    let tokenExists = await RefreshTokenStore.exists({ token: refreshToken });
    if ( !tokenExists ) return res
        .status(404)
        .send("Refresh token has been invalidated.");


    let user: IUser | null = await User.findOne({ name: tokenInfo.name });
    if (!user) {
        return res
            .status(404)
            .send("User not found.")
    }

    let payload = genTokenPayload(user);
    res
        .status(200)
        .json({
            accessToken: genAccessToken(payload),
        });

}





async function logout(req: Request, res: Response) {

    let { refreshToken } = req.body;
    if ( !refreshToken ) return res
        .status(400)
        .send("Refresh token missing.");

    await RefreshTokenStore.deleteOne({ token: refreshToken });
    res.status(200).send("Token successfully deleted.");

}




export {
    createNewUser,
    login,
    logout,
    getNewAccessToken,
}