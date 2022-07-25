"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RefreshTokenStore_1 = require("../src/api/models/RefreshTokenStore");
describe("Array that storres refresh tokens", () => {
    test("Push a token onto the list", () => {
        expect((0, RefreshTokenStore_1.pushRefreshToken)("exampleToken")).toBeUndefined();
    });
    test("Return true if token exists", () => {
        (0, RefreshTokenStore_1.pushRefreshToken)("token1");
        expect((0, RefreshTokenStore_1.refreshTokenExists)('token1')).toBe(true);
    });
    test("return flalse if token doesent exist", () => {
        expect((0, RefreshTokenStore_1.refreshTokenExists)('token2')).toBe(false);
    });
    test("deletes a token from the list", () => {
        (0, RefreshTokenStore_1.deleteToken)("token1");
        expect((0, RefreshTokenStore_1.refreshTokenExists)('token1')).toBe(false);
    });
});
