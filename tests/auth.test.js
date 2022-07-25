"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const helpers_1 = require("../src/api/helpers");
const User_1 = __importDefault(require("../src/api/models/User"));
describe("Creating and verifying json web tokens", () => {
    let user = new User_1.default("oliveringle", "totalyrandomhashedpassword");
    let payload = (0, helpers_1.genTokenPayload)(user);
    let token = (0, helpers_1.genAccessToken)(payload);
    let verified = (0, helpers_1.verifyAccessTokenAndGetInfo)(token);
    it("should generate a token payload", () => {
        expect(payload).toEqual({
            name: "oliveringle"
        });
    });
    it("Create a token from with a user and a secret", () => {
        expect(token).not.toEqual(payload);
    });
    it("Verify valid token sucessfuly", () => {
        expect(verified[0]).toBe(true);
    });
    it("should invalidate bad token", () => {
        let invalidToken = "notvalid";
        let unverified = (0, helpers_1.verifyAccessTokenAndGetInfo)(invalidToken);
        expect(unverified[0]).toBe(false);
    });
    it("Retrieve user information from token", () => {
        expect(verified[1]).toHaveProperty("name");
        expect(verified[1]?.name).toBe("oliveringle");
    });
    // IMPORTANT: set expires in to 1s for this test
    // it("Token expires after 1 second", () => {
    //     setTimeout(() => {
    //         let expired = verifyAccessTokenAndGetInfo(token);
    //         expect(expired[0]).toBe(false);
    //     }, 1100)
    // });
});
