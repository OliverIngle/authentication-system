import { Document, Schema, model } from "mongoose";

interface IRefreshToken extends Document {
    token: string,
}

const refreshTokenSchema = new Schema<IRefreshToken>({
    token: {
        type: String,
        required: true,
    }
});

const RefreshTokenStore = model<IRefreshToken>('RefreshTokenStore', refreshTokenSchema);

export default RefreshTokenStore;
export { IRefreshToken }