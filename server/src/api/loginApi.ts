import Express from "express";
import { userModel } from "../dbModels";
import { deleteToken, loginToken } from "../tokenHandle";

export class LoginAPI {
    constructor(private app: Express.Application) {
        this.app.post("/api/login", this.login);
        this.app.post("/api/logout", this.logout);
        this.app.put("/api/login", this.register);
    }

    login = async (req: Express.Request, res: Express.Response) => {
        // console.log("login request received")
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
        // console.log("Token for " + user[0].name + " is: " + token);
        //set return content type to json
        res.setHeader("Content-Type", "application/json");
        res.status(200).send({token});
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

    register = async (req: Express.Request, res: Express.Response) => {
        const { cf, name, surname, birthDate, phoneNumber, email, address, password, subscriptionDate } = req.body;
        //if one field is missing, return error
        if (!cf || !name || !surname || !birthDate || !phoneNumber || !email || !address || !password || !subscriptionDate) {
            res.status(400).send("invalid request: one or more fields are missing");
            return;
        }
        const user = await userModel.find({ email });
        if (user.length > 0) {
            res.status(401).send("user already exists");
            return;
        }
        const newUser = new userModel({
            cf,
            name,
            surname,
            birthDate,
            phoneNumber,
            email,
            address,
            password,
            subscriptionDate
        });
        const id = await newUser.save();
        const token = await loginToken(id._id.toString());
        res.status(200).send({token});
    }
}