import express from "express";

class UserController {

    public register(req: express.Request, res: express.Response) {
        res.status(400).json({status: true, message: 'register action!'});
    }
    public auth(req: express.Request, res: express.Response) {
        res.status(400).json({status: true, message: 'auth action!'});
    }
    public update(req: express.Request, res: express.Response) {
        res.status(400).json({status: true, message: 'update action!'});
    }
}

export default UserController;
