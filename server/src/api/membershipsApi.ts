import Express from "express";
import path from "path";
import { membershipModel } from "../dbModels";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { isAdmin } from "../tokenHandle";
import { notFoundImage } from "../server";

export class MembershipAPI {
    constructor(private app: Express.Application) {
        this.app.get("/api/memberships", this.getMemberships);
        this.app.get("/api/membership/:membershipID", this.getMembership);
        this.app.get("/api/membership/:membershipID/image", this.getMembershipImage);
        this.app.put("/api/membership", this.putMembership);
        this.app.delete("/api/membership", this.deleteMembership);
    }

    private readonly pathToImages = path.resolve(path.join(__dirname, '../../images/'));
    private readonly pathToMemberships = path.resolve(path.join(this.pathToImages, '/memberships/'));

    private getMemberships = async (req: Express.Request, res: Express.Response) => {
        try {
            const ret = await membershipModel.find({});
            const returnData = ret.map(item => {
                return {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    endDate: item.endDate
                }
            });
            res.send(returnData);
        } catch (err) {
            // console.log(err);
            res.status(500).send("error");
            return;
        }
    }

    private getMembership = async (req: Express.Request, res: Express.Response) => {
        try {
            const ret = await membershipModel.find({ _id: req.params.membershipID });
            const returnData = ret.map(item => {
                return {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    endDate: item.endDate
                }
            });
            if (returnData.length == 0) {
                res.status(404).send("membership not found");
                return;
            }
            res.status(200).send(returnData[0]);
        } catch (err) {
            // console.log(err);
            res.status(500).send("error");
            return;
        }
    }

    private getMembershipImage = async (req: Express.Request, res: Express.Response) => {
        const p = path.join(this.pathToMemberships, req.params.membershipID + ".png");
        // console.log(p);
        if (!fs.existsSync(p)) {
            // res.status(404).send("image not found");
            res.status(404).sendFile(notFoundImage);
            return;
        }
        res.sendFile(p);
    }

    private putMembership = async (req: Express.Request, res: Express.Response) => {
        const { token } = req.body;
        if (!token || !req.files || !req.body.name || !req.body.price || !req.body.description || !req.body.endDate) {
            res.status(400).send("invalid request");
            // console.log(req.body);
            return;
        }
        if (!(await isAdmin(token))){
            res.status(401).send("invalid token");
            return;
        }
        // console.log(req.files);
        const membership = new membershipModel({
            name: req.body.name,
            price: req.body.price, 
            description: req.body.description,
            endDate: req.body.endDate
        });
        const p = await membership.save();

        const file = req.files.file;
        (file as UploadedFile).mv(path.join(this.pathToMemberships, p._id + ".png"));

        res.status(200).send("ok");
    }

    private deleteMembership = async (req: Express.Request, res: Express.Response) => {
        const { token, membershipID } = req.body;
        if (!(await isAdmin(token))){
            res.status(401).send("invalid token");
            return;
        }
        await membershipModel.deleteOne({ _id: membershipID });
        fs.rmSync(path.join(this.pathToMemberships, membershipID + ".png"));
        res.status(200).send("ok");
    }
}