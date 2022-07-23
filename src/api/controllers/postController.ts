import { Request, Response, NextFunction } from "express";
import Post from "../models/Post";
import User from "../models/User";
import { TokenInfo } from "../helpers";

function getPosts(req: Request, res: Response) {
    res.status(200).json({
        posts: Post.getAll()
    });
}

function newPost(req: Request, res: Response) {
    let { text } = req.body;
    let token = req.tokenInfo;
    if (!token) {
        return res.status(200).send("Login required.")
    }

    try {
        let username = (token as TokenInfo).name;
        if (!username) {
            return res
                .status(500)
                .send("Failed to find username.")
        }
        new Post(username, text).save()
    } catch(err) {
        res
            .status(500)
            .send("Something went wrong.")
    }
    
    res.status(200).send("Post saved!");
}

export {
    getPosts,
    newPost,
}