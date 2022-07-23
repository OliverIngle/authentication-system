import { hash, compare } from "../src/api/helpers";

describe("Hashing and comparing a password", () => {

    it("hash the give password", () => {
        expect(hash("password")).not.toBe("password");
    });

    it("should append salt to hash", () => {
        let hashedPassword = hash("password");
        expect(hashedPassword.split(':').length).toBe(2)
    });

    it("two hashes of same password !equal", () => {
        let password = "password";
        expect(hash(password)).not.toEqual(hash(password));
    });

    it("compare correct and incorect passwords", () => {
        let password = "secret123";
        let hashedPassword = hash(password);
        expect(compare(hashedPassword, password)).toBe(true);
        expect(compare(hashedPassword, "321secret")).toBe(false);
    });

})