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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipAPI = void 0;
const path_1 = __importDefault(require("path"));
const dbModels_1 = require("../dbModels");
const fs_1 = __importDefault(require("fs"));
const tokenHandle_1 = require("../tokenHandle");
const server_1 = require("../server");
class MembershipAPI {
    constructor(app) {
        this.app = app;
        this.pathToImages = path_1.default.resolve(path_1.default.join(__dirname, '../../images/'));
        this.pathToMemberships = path_1.default.resolve(path_1.default.join(this.pathToImages, '/memberships/'));
        this.getMemberships = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield dbModels_1.membershipModel.find({});
                const returnData = ret.map(item => {
                    return {
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        description: item.description,
                        endDate: item.endDate
                    };
                });
                res.send(returnData);
            }
            catch (err) {
                // console.log(err);
                res.status(500).send("error");
                return;
            }
        });
        this.getMembership = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield dbModels_1.membershipModel.find({ _id: req.params.membershipID });
                const returnData = ret.map(item => {
                    return {
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        description: item.description,
                        endDate: item.endDate
                    };
                });
                if (returnData.length == 0) {
                    res.status(404).send("membership not found");
                    return;
                }
                res.status(200).send(returnData[0]);
            }
            catch (err) {
                // console.log(err);
                res.status(500).send("error");
                return;
            }
        });
        this.getMembershipImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const p = path_1.default.join(this.pathToMemberships, req.params.membershipID + ".png");
            console.log(p);
            if (!fs_1.default.existsSync(p)) {
                // res.status(404).send("image not found");
                res.status(404).sendFile(server_1.notFoundImage);
                return;
            }
            res.sendFile(p);
        });
        this.putMembership = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            if (!token || !req.files || !req.body.name || !req.body.price || !req.body.description || !req.body.endDate) {
                res.status(400).send("invalid request");
                // console.log(req.body);
                return;
            }
            if (!(yield (0, tokenHandle_1.isAdmin)(token))) {
                res.status(401).send("invalid token");
                return;
            }
            // console.log(req.files);
            const membership = new dbModels_1.membershipModel({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                endDate: req.body.endDate
            });
            const p = yield membership.save();
            const file = req.files.file;
            file.mv(path_1.default.join(this.pathToMemberships, p._id + ".png"));
            res.status(200).send("ok");
        });
        this.deleteMembership = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token, membershipID } = req.body;
            if (!token || !membershipID) {
                res.status(400).send("invalid request");
                return;
            }
            if (!(yield (0, tokenHandle_1.isAdmin)(token))) {
                res.status(401).send("invalid token");
                return;
            }
            yield dbModels_1.membershipModel.deleteOne({ _id: membershipID });
            fs_1.default.rmSync(path_1.default.join(this.pathToMemberships, membershipID + ".png"));
            res.status(200).send("ok");
        });
        this.app.get("/api/memberships", this.getMemberships);
        this.app.get("/api/membership/:membershipID", this.getMembership);
        this.app.get("/api/membership/:membershipID/image", this.getMembershipImage);
        this.app.put("/api/membership", this.putMembership);
        this.app.delete("/api/membership", this.deleteMembership);
    }
}
exports.MembershipAPI = MembershipAPI;
