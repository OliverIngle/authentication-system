"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../src/api/helpers");
describe("Hashing and comparing a password", () => {
    it("hash the give password", () => {
        expect((0, helpers_1.hash)("password")).not.toBe("password");
    });
    it("should append salt to hash", () => {
        let hashedPassword = (0, helpers_1.hash)("password");
        expect(hashedPassword.split(':').length).toBe(2);
    });
    it("two hashes of same password !equal", () => {
        let password = "password";
        expect((0, helpers_1.hash)(password)).not.toEqual((0, helpers_1.hash)(password));
    });
    it("compare correct and incorect passwords", () => {
        let password = "secret123";
        let hashedPassword = (0, helpers_1.hash)(password);
        expect((0, helpers_1.compare)(hashedPassword, password)).toBe(true);
        expect((0, helpers_1.compare)(hashedPassword, "321secret")).toBe(false);
    });
});
