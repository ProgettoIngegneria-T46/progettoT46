import { app } from "../server";
import supertest from "supertest";
import { loginTokenModel, courseModel, userModel } from "../dbModels";
import mongoose from "mongoose";

const mockingoose = require("mockingoose");

beforeEach(async () => {
    mockingoose.resetAll();
});

describe("GET /api/courses", () => {
    it("should return 200", async () => {
        mockingoose(courseModel).toReturn([], "find");
        const res = await supertest(app).get("/api/courses");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBe(0);
    });

    it("should return no elements", async () => {
        mockingoose(courseModel).toReturn([], "find");
        const res = await supertest(app).get("/api/courses");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBe(0);
    });
    
    it("should return at least one element", async () => {
        mockingoose(courseModel).toReturn([{}], "find");
        const res = await supertest(app).get("/api/courses");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET /api/course/:courseID", () => {
    it("should return 404", async () => {
        mockingoose(courseModel).toReturn([], "find");
        const res = await supertest(app).get("/api/course/1");
        expect(res.status).toBe(404);
    });
    
    it("should return 200", async () => {
        mockingoose(courseModel).toReturn([{}], "find");
        const res = await supertest(app).get("/api/course/1");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});
// 63a4b9d307766d7e849fe253
describe("GET /api/course/:courseID/image", () => {
    it("should return 404", async () => {
        const res = await supertest(app).get("/api/course/1/image");
        expect(res.status).toBe(404);
    });
    
    it("should return 200", async () => {
        const res = await supertest(app).get("/api/course/63a4c05423a222b48af300da/image");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

describe("PUT /api/course", () => {
    it("should return 400", async () => {
        const res = await supertest(app).put("/api/course");
        expect(res.status).toBe(400);
    });

    it("should return 401", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: false }, "findOne");
        mockingoose(courseModel).toReturn({ _id: new mongoose.Types.ObjectId("000000000000000000000000")}, "save");
        const res = await supertest(app).put("/api/course")
            .field("token", "1")
            .field("name", "testCourse")
            .field("description", "testDescription")
            .field("price", 1.99)
            .field("endDate", Date.now() + 10 * 60 * 1000)
            .field("subscriptions", 0)
            .attach("file", __dirname + "\\..\\..\\images\\misc\\notFound.png");
            // .attach("file", "C:\\Users\\micle\\Documents\\programmi\\Node\\progettoT46\\server\\images\\misc\\notFound.png");
        expect(res.status).toBe(401);
    });
    
    it("should return 200", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: true }, "findOne");
        mockingoose(courseModel).toReturn({ _id: new mongoose.Types.ObjectId("000000000000000000000000")}, "save");
        const res = await supertest(app).put("/api/course")
            .field("token", "1")
            .field("name", "testCourse")
            .field("description", "testDescription")
            .field("price", 1.99)
            .field("endDate", Date.now() + 10 * 60 * 1000)
            .attach("file", __dirname + "\\..\\..\\images\\misc\\notFound.png");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

describe("DELETE /api/course", () => {
    it("should return 400", async () => {
        const res = await supertest(app).delete("/api/course");
        expect(res.status).toBe(400);
    });
    
    it("should return 401", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: false }, "findOne");
        const res = await supertest(app).delete("/api/course").send(
            {
                token: "1", 
                courseID: "000000000000000000000000"
            });
        expect(res.status).toBe(401);
    });

    it("should return 200", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: true }, "findOne");
        const res = await supertest(app).delete("/api/course").send(
            {
                token: "1", 
                courseID: "000000000000000000000000"
            });
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

