import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    name: string,
    passwordHash: string,
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
});

const User = model<IUser>('User', userSchema);

export default User;
export {
    IUser,
}