import path from "path";
import fs from "fs";
import Express from "express";
import { courseModel } from "../dbModels";
import { Document } from "mongoose";
import { isAdmin } from "../tokenHandle";
import { UploadedFile } from "express-fileupload";

class Course {
    public id: string;
    public name: string;
    public price: number;
    public description: string;
    public endDate: Date;
    public subscriptions: number;

    constructor(course: any) {
        this.id = course._id;
        this.name = course.name;
        this.price = course.price;
        this.description = course.description;
        this.endDate = course.endDate;
        this.subscriptions = course.subscriptions;
    }
}

export class CoursesAPI {
    constructor(app: Express.Application) {

    }

    private readonly pathToImages = path.resolve(path.join(__dirname, '../../images/'));
    private readonly pathToCourses = path.resolve(path.join(this.pathToImages, '/courses/'));

    private getCorses = async (req: Express.Request, res: Express.Response) => {
        try {
            const ret = await courseModel.find({});
            const returnData = ret.map(item => new Course(item));
            res.send(returnData);
        } catch (err) {
            console.log(err);
            res.status(500).send("error");
            return;
        }
    }

    private getCourse = async (req: Express.Request, res: Express.Response) => {
        try {
            const ret = await courseModel.find({ _id: req.params.courseID });
            const returnData = ret.map(item => new Course(item));
            if (returnData.length == 0) {
                res.status(404).send("course not found");
                return;
            }
            res.status(200).send(returnData[0]);
        } catch (err) {
            console.log(err);
            res.status(500).send("error");
            return;
        }
    }

    private getCourseImage = async (req: Express.Request, res: Express.Response) => {
        //return image from images/products folder with name = productID
        const p = path.join(this.pathToCourses, req.params.courseID + ".png");
        console.log(p);
        if (!fs.existsSync(p)) {
            res.status(404).send("image not found");
            return;
        }
        res.sendFile(p);
    }

    private putCourse = async (req: Express.Request, res: Express.Response) => {
        const { token } = req.body;
        if (!(await isAdmin(token))) {
            res.status(401).send("invalid token");
            return;
        }
        if (!req.files || !req.body.name || !req.body.price) {
            res.status(400).send("invalid request");
            return;
        }
        console.log(req.files);
        //add product to db
        const course = new courseModel({
            name: req.body.name,
            price: req.body.price
        });
        const p = await course.save();

        const file = req.files.file;
        (file as UploadedFile).mv(path.join(this.pathToCourses, p._id + ".png"));

        res.status(200).send("ok");
    }

    private deleteProduct = async (req: Express.Request, res: Express.Response) => {
        const { token, productID: courseID } = req.body;
        if (!(await isAdmin(token))) {
            res.status(401).send("invalid token");
            return;
        }
        await courseModel.deleteOne({ _id: courseID });
        fs.rmSync(path.join(this.pathToCourses, courseID + ".png"));
        res.status(200).send("ok");
    }
}