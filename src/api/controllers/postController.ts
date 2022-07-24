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
        return res.status(401).send("Login required.")
    }

    try {
        let username = token.name;
        new Post(username, text).save()
    } catch(err) {
        res
            .status(500)
            .send("Something went wrong, try loging out and back in.")
    }
    
    res.status(201).send("Post saved!");
}

export {
    getPosts,
    newPost,
}