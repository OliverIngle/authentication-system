import { pushRefreshToken, refreshTokenExists } from "../src/api/models/RefreshTokenStore";

describe("Array that storres refresh tokens", () => {

    test("Push a token onto the list", () => {
        expect(pushRefreshToken("exampleToken")).toBeUndefined();
    })

    test("Return true if token exists", () => {
        pushRefreshToken("token1");
        expect(refreshTokenExists('token1')).toBe(true);
    });
    
    test("return flalse if token doesent exist", () => {
        expect(refreshTokenExists('token2')).toBe(false);
    });

});