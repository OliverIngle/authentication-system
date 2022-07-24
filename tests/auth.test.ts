import 'dotenv/config';

import {
    genAccessToken,
    genRefreshToken,
    genTokenPayload,
    verifyAccessTokenAndGetInfo,
} from "../src/api/helpers";
import User from "../src/api/models/User";

describe("Creating and verifying json web tokens", () => {

    let user = new User("oliveringle", "totalyrandomhashedpassword");

    let payload = genTokenPayload(user);
    let token = genAccessToken(payload);

    let verified = verifyAccessTokenAndGetInfo(token);

    it("should generate a token payload", () => {
        expect(payload).toEqual({
            name: "oliveringle"
        })
    });

    it("Create a token from with a user and a secret", () => {
        expect(token).not.toEqual(payload);
    });

    it("Verify valid token sucessfuly", () => {
        expect(verified[0]).toBe(true);
    });

    it("should invalidate bad token", () => {
        let invalidToken = "notvalid";
        let unverified = verifyAccessTokenAndGetInfo(invalidToken);
        expect(unverified[0]).toBe(false);
    });

    it("Retrieve user information from token", () => {
        expect(verified[1]).toHaveProperty("name");
        expect(verified[1]?.name).toBe("oliveringle")
    });


    // IMPORTANT: set expires in to 1s for this test

    // it("Token expires after 1 second", () => {
    //     setTimeout(() => {
    //         let expired = verifyAccessTokenAndGetInfo(token);
    //         expect(expired[0]).toBe(false);
    //     }, 1100)
    // });

});