import Express from "express";
import { userModel } from "../dbModels";
import { deleteToken, loginToken } from "../tokenHandle";

export class LoginAPI {
    constructor(private app: Express.Application) {
        this.app.post("/api/login", this.login);
        this.app.post("/api/logout", this.logout);
    }

    login = async (req: Express.Request, res: Express.Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send("invalid request: email or password missing");
            return;
        }
        //check if user exists
        //if exists, generate token and save it in db
        //return token
        const user = await userModel.find({ email, password });
        if (user.length == 0) {
            res.status(401).send("invalid credentials");
            return;
        }
        //generate token
        const token = await loginToken(user[0]._id.toString());
        console.log("Token for " + user[0].name + " is: " + token);
        //set return content type to json
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(token);
    }

    logout = async (req: Express.Request, res: Express.Response) => {
        const { token } = req.body;
        if (!token) {
            res.status(400).send("invalid request: token missing");
            return;
        }
        //check if token exists in db
        //if exists, delete it
        deleteToken(token);
        res.status(200).send("ok");
    }
}