import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/Post";
import User from "../models/User";
import { TokenInfo } from "../helpers";
import { ALL } from "dns";

async function getPosts(req: Request, res: Response) {
    let posts: IPost[] = await Post.find();
    res.status(200).json({posts});
}

function newPost(req: Request, res: Response) {
    let { text } = req.body;
    let token = req.tokenInfo;
    if (!token) {
        return res.status(401).send("Login required.")
    }
    let username = token.name;
    let post: IPost = new Post({
        username,
        text,
    });
    post.save().catch(err => {
        res
            .status(500)
            .send("Something went wrong, try loging out and back in.");
    })
    
    res.status(201).send("Post saved!");
}

export {
    getPosts,
    newPost,
}