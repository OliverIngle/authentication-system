import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

function hash(password: string): string {
    let salt = randomBytes(16).toString('hex');
    let hashedPassword = scryptSync(password, salt, 16).toString('hex');

    return `${salt}:${hashedPassword}`
}

function compare(hashedPassword: string, password: string): boolean {
    let [salt, key] = hashedPassword.split(':');
    let hashedBuffer = scryptSync(password, salt, 16);

    let keyBuffer = Buffer.from(key, 'hex');
    let match = timingSafeEqual(hashedBuffer, keyBuffer);

    return match;
}

export {
    hash,
    compare,
}