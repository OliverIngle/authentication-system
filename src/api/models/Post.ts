import { Schema, model, Document } from "mongoose";

interface IPost extends Document {
    username: string,
    text: string;
}

const postSchema = new Schema<IPost>({
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

const Post = model<IPost>('Post', postSchema);
export default Post;
export {
    IPost,
}