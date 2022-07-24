import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

interface TokenInfo extends JwtPayload {
    name: string,
}

type TokenVerifyResult = [boolean, TokenInfo?];

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

function genTokenPayload(user: User): TokenInfo {
    return {
        name: user.username
    }
}

function genAccessToken(payload: TokenInfo) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '2m' })
}

function genRefreshToken(payload: TokenInfo) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET)
}

function verifyTokenAndGetInfo(token: string, secret: string): TokenVerifyResult {
    try {
        let decoded = jwt.verify(token, secret);
        return [true, decoded as TokenInfo]
    } catch(err) {
        return [false]
    }
}

function verifyAccessTokenAndGetInfo(token: string): TokenVerifyResult {
    return verifyTokenAndGetInfo(token, ACCESS_TOKEN_SECRET)
}

function verifyRefreshTokenAndGetInfo(token: string): TokenVerifyResult {
    return verifyTokenAndGetInfo(token, REFRESH_TOKEN_SECRET)
}

export {
    TokenInfo,
    genTokenPayload,
    genAccessToken,
    genRefreshToken,
    verifyAccessTokenAndGetInfo,
    verifyRefreshTokenAndGetInfo,
}