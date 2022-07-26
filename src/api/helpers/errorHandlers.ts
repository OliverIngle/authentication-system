import { Request, Response, NextFunction } from "express";

function errorHanler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error("ERROR: something went wrong." + err);
    res.status(500).send("Somenthing went wrong.");
}

export {
    errorHanler,
}