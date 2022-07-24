import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { verifyAccessTokenAndGetInfo } from "../helpers";

function authorizeToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(' ')[1];
    if (!token) return res
        .status(400)
        .send("Athentication token missing.");

    let [passedVerification, tokenInfo] = verifyAccessTokenAndGetInfo(token);

    if (!passedVerification) {
        return res
            .status(401)
            .send("Invalid token.");
    }

    req.tokenInfo = tokenInfo!;

    next();
}

export {
    authorizeToken,
}