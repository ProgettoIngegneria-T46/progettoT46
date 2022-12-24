import { app } from "../server";
import supertest from "supertest";
import { loginTokenModel, courseModel, userModel } from "../dbModels";

const mockingoose = require("mockingoose");

beforeEach(async () => {
    mockingoose.resetAll();
});

/* describe("GET /api/notfound/image", () => {
    it("should return 200", async () => {
        const res = await supertest(app).get("/api/notfound/image");
        expect(res.status).toBe(200);
    });
}); */

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
        const res = await supertest(app).get("/api/course/Pilates/image");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

describe("PUT /api/course", () => {
    it("should return 400", async () => {
        const res = await supertest(app).put("/api/course");
        expect(res.status).toBe(400);
    });
    
    // it("should return 200", async () => {
    //     mockingoose(loginTokenModel).toReturn([{expires: new Date()}]);
    //     mockingoose(userModel).toReturn({_id: "1", isAdmin: true}, "findOne");
    //     const res = await supertest(app).put("/api/course").send({
    //         "name": "test",
    //         "price": 1,
    //         "description": "test",
    //         "endDate": new Date(),
    //         "token": "test"
    //     });
    //     expect(res.status).toBe(200);
    //     expect(res.body).toBeTruthy();
    // });
});