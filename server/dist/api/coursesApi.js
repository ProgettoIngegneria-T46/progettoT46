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
exports.CoursesAPI = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dbModels_1 = require("../dbModels");
const tokenHandle_1 = require("../tokenHandle");
const server_1 = require("../server");
class Course {
    constructor(course) {
        this.id = course._id;
        this.name = course.name;
        this.price = course.price;
        this.description = course.description;
        this.endDate = course.endDate;
        this.subscriptions = course.subscriptions;
    }
}
class CoursesAPI {
    constructor(app) {
        this.app = app;
        this.pathToImages = path_1.default.resolve(path_1.default.join(__dirname, '../../images/'));
        this.pathToCourses = path_1.default.resolve(path_1.default.join(this.pathToImages, '/courses/'));
        this.getCourses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield dbModels_1.courseModel.find({});
                const returnData = ret.map(item => new Course(item));
                res.send(returnData);
            }
            catch (err) {
                // console.log(err);
                res.status(500).send("error");
                return;
            }
        });
        this.getCourse = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield dbModels_1.courseModel.find({ _id: req.params.courseID });
                const returnData = ret.map(item => new Course(item));
                if (returnData.length == 0) {
                    res.status(404).send("course not found");
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
        this.getCourseImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //return image from images/products folder with name = productID
            const p = path_1.default.join(this.pathToCourses, req.params.courseID + ".png");
            // console.log(p);
            if (!fs_1.default.existsSync(p)) {
                // res.status(404).send("image not found");
                res.status(404).sendFile(server_1.notFoundImage);
                return;
            }
            res.sendFile(p);
        });
        this.putCourse = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            if (!token || !req.files || !req.body.name || !req.body.price || !req.body.description || !req.body.endDate) {
                res.status(400).send("invalid request");
                return;
            }
            if (!(yield (0, tokenHandle_1.isAdmin)(token))) {
                res.status(401).send("invalid token");
                return;
            }
            // console.log(req.files);
            //add product to db
            const course = new dbModels_1.courseModel({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                endDate: req.body.endDate,
            });
            const p = yield course.save();
            const file = req.files.file;
            file.mv(path_1.default.join(this.pathToCourses, p._id + ".png"));
            res.status(200).send("ok");
        });
        this.deleteCourse = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token, courseID } = req.body;
            if (!token || !courseID) {
                res.status(400).send("invalid request");
                return;
            }
            if (!(yield (0, tokenHandle_1.isAdmin)(token))) {
                res.status(401).send("invalid token");
                return;
            }
            yield dbModels_1.courseModel.deleteOne({ _id: courseID });
            fs_1.default.rmSync(path_1.default.join(this.pathToCourses, courseID + ".png"));
            res.status(200).send("ok");
        });
        this.app.get("/api/courses", this.getCourses);
        this.app.get("/api/course/:courseID", this.getCourse);
        this.app.get("/api/course/:courseID/image", this.getCourseImage);
        this.app.put("/api/course", this.putCourse);
        this.app.delete("/api/course", this.deleteCourse);
    }
}
exports.CoursesAPI = CoursesAPI;
