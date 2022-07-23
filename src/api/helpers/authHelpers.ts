import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

interface TokenInfo extends JwtPayload {
    name?: string,
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
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '100s' })
}

function genRefreshToken(payload: TokenInfo) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET)
}

function verifyAccessTokenAndGetInfo(token: string): TokenVerifyResult {
    try {
        let decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return [true, decoded as TokenInfo]
    } catch(err) {
        return [false]
    }
}

export {
    TokenInfo,
    genTokenPayload,
    genAccessToken,
    genRefreshToken,
    verifyAccessTokenAndGetInfo,
}