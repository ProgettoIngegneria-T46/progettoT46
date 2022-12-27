"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAPI = void 0;
const dbModels_1 = require("../dbModels");
const tokenHandle_1 = require("../tokenHandle");
class LoginAPI {
    constructor(app) {
        this.app = app;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log("login request received")
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).send("invalid request: email or password missing");
                return;
            }
            //check if user exists
            //if exists, generate token and save it in db
            //return token
            const user = yield dbModels_1.userModel.find({ email, password });
            if (user.length == 0) {
                res.status(401).send("invalid credentials");
                return;
            }
            //generate token
            const token = yield (0, tokenHandle_1.loginToken)(user[0]._id.toString());
            // console.log("Token for " + user[0].name + " is: " + token);
            //set return content type to json
            res.setHeader("Content-Type", "application/json");
            res.status(200).send({ token });
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            if (!token) {
                res.status(400).send("invalid request: token missing");
                return;
            }
            //check if token exists in db
            //if exists, delete it
            (0, tokenHandle_1.deleteToken)(token);
            res.status(200).send("ok");
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { cf, name, surname, birthDate, phoneNumber, email, address, password, subscriptionDate } = req.body;
            //if one field is missing, return error
            if (!cf || !name || !surname || !birthDate || !phoneNumber || !email || !address || !password) {
                res.status(400).send("invalid request: one or more fields are missing");
                return;
            }
            const _subscriptionDate = subscriptionDate || new Date();
            const user = yield dbModels_1.userModel.find({ email });
            if (user.length > 0) {
                res.status(401).send("user already exists");
                return;
            }
            const newUser = new dbModels_1.userModel({
                cf,
                name,
                surname,
                birthDate,
                phoneNumber,
                email,
                address,
                password,
                subscriptionDate: _subscriptionDate
            });
            const id = yield newUser.save();
            const token = yield (0, tokenHandle_1.loginToken)(id._id.toString());
            res.status(200).send({ token });
        });
        this.app.post("/api/login", this.login);
        this.app.post("/api/logout", this.logout);
        this.app.put("/api/login", this.register);
    }
}
exports.LoginAPI = LoginAPI;
