import { JwtPayload } from "jsonwebtoken";

export default class User {
    
    public username: string;
    public passwordHash: string;

    constructor(username: string, passwordHash: string) {
        this.username = username;
        this.passwordHash = passwordHash;
    }

    static save(user: User): boolean {
        if (user.exists()) return false;
        userList.push(user);
        return true
    }

    exists(): boolean {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === this.username) {
                return true
            }
        }
        return false;
    }

    static findOne(username: string): User {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === username) {
                return userList[i]
            }
        }
        throw new Error("User not found.");
    }

}

let userList: User[] = [];