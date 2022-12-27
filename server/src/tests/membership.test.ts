import { app } from "../server";
import supertest from "supertest";
import { loginTokenModel, membershipModel, userModel } from "../dbModels";
import mongoose from "mongoose";

const mockingoose = require("mockingoose");

beforeEach(async () => {
    mockingoose.resetAll();
});

describe("GET /api/memberships", () => {
    it("should return 200", async () => {
        mockingoose(membershipModel).toReturn([], "find");
        const res = await supertest(app).get("/api/memberships");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });

    it("should return no elements", async () => {
        mockingoose(membershipModel).toReturn([], "find");
        const res = await supertest(app).get("/api/memberships");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBe(0);
    });
    
    it("should return at least one element", async () => {
        mockingoose(membershipModel).toReturn([{}], "find");
        const res = await supertest(app).get("/api/memberships");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET /api/membership/:membershipID", () => {
    it("should return 404", async () => {
        mockingoose(membershipModel).toReturn([], "find");
        const res = await supertest(app).get("/api/membership/1");
        expect(res.status).toBe(404);
    });
    
    it("should return 200", async () => {
        mockingoose(membershipModel).toReturn([{}], "find");
        const res = await supertest(app).get("/api/membership/1");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});
// 63a4b9d307766d7e849fe253
describe("GET /api/membership/:membershipID/image", () => {
    it("should return 404", async () => {
        const res = await supertest(app).get("/api/membership/1/image");
        expect(res.status).toBe(404);
    });
    
    it("should return 200", async () => {
        const res = await supertest(app).get("/api/membership/63a5ba2dc960327f84435083/image");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

describe("PUT /api/membership", () => {
    it("should return 400", async () => {
        const res = await supertest(app).put("/api/membership");
        expect(res.status).toBe(400);
    });

    it("should return 401", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: false }, "findOne");
        mockingoose(membershipModel).toReturn({ _id: new mongoose.Types.ObjectId("000000000000000000000000")}, "save");
        const res = await supertest(app).put("/api/membership")
            .field("token", "1")
            .field("name", "testMembership")
            .field("description", "testDescription")
            .field("price", 1.99)
            .field("endDate", Date.now() + 10 * 60 * 1000)
            .attach("file", "C:\\Users\\micle\\Documents\\programmi\\Node\\progettoT46\\server\\images\\misc\\notFound.png");
        expect(res.status).toBe(401);
    });
    
    it("should return 200", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: true }, "findOne");
        mockingoose(membershipModel).toReturn({ _id: new mongoose.Types.ObjectId("000000000000000000000000")}, "save");
        const res = await supertest(app).put("/api/membership")
            .field("token", "1")
            .field("name", "testMembership")
            .field("description", "testDescription")
            .field("price", 1.99)
            .field("endDate", Date.now() + 10 * 60 * 1000)
            .attach("file", "C:\\Users\\micle\\Documents\\programmi\\Node\\progettoT46\\server\\images\\misc\\notFound.png");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

describe("DELETE /api/membership", () => {
    it("should return 400", async () => {
        const res = await supertest(app).delete("/api/membership");
        expect(res.status).toBe(400);
    });
    
    it("should return 401", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: false }, "findOne");
        const res = await supertest(app).delete("/api/membership").send(
            {
                token: "1", 
                membershipID: "000000000000000000000000"
            });
        expect(res.status).toBe(401);
    });

    it("should return 200", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: true }, "findOne");
        const res = await supertest(app).delete("/api/membership").send(
            {
                token: "1", 
                membershipID: "000000000000000000000000"
            });
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

