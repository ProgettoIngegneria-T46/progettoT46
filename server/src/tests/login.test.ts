import { app } from "../server";
import supertest from "supertest";
import { loginTokenModel, courseModel, userModel } from "../dbModels";
import mongoose from "mongoose";

const mockingoose = require("mockingoose");

beforeEach(async () => {
    mockingoose.resetAll();
});

describe("POST /api/login", () => {
    it("should return 400", async () => {
        const res = await supertest(app).post("/api/login");
        expect(res.status).toBe(400);
    });

    it("should return 401", async () => {
        mockingoose(userModel).toReturn([], "find");
        const res = await supertest(app).post("/api/login").send({
            email: "test",
            password: "test"
        });
        expect(res.status).toBe(401);
    });

    it("should return 200", async () => {
        mockingoose(userModel).toReturn([{}], "find");
        mockingoose(loginTokenModel).toReturn([{ _id: new mongoose.Types.ObjectId("000000000000000000000000"), expires: Date.now() + 10 * 60 * 1000}], "find");
        const res = await supertest(app).post("/api/login").send(
            {
                email: "test",
                password: "test"
            });
        expect(res.status).toBe(200);
        expect(res.body.token).toBe("000000000000000000000000");
    });
});

describe("POST /api/logout", () => {
    it("should return 400", async () => {
        const res = await supertest(app).post("/api/logout");
        expect(res.status).toBe(400);
    });

    it("should return 200", async () => {
        mockingoose(loginTokenModel).toReturn([{ expires: Date.now() + 10 * 60 * 1000}], "find");
        const res = await supertest(app).post("/api/logout").send({
            token: "1"
        });
        expect(res.status).toBe(200);
    });
});

describe("PUT /api/login", () => {
    it("should return 400", async () => {
        const res = await supertest(app).put("/api/login");
        expect(res.status).toBe(400);
    });

    it("should return 401", async () => {
        mockingoose(userModel).toReturn([{}], "find");
        const res = await supertest(app).put("/api/login").send({
            cf: "test", 
            name: "test", 
            surname: "test", 
            birthDate: "test", 
            phoneNumber: "test", 
            email: "test", 
            address: "test", 
            password: "test", 
            subscriptionDate: "test"
        });
        expect(res.status).toBe(401);
    });

    it("should return 200", async () => {
        mockingoose(userModel).toReturn([], "find");
        mockingoose(userModel).toReturn({/*  _id: new mongoose.Types.ObjectId("000000000000000000000000")  */}, "save");
        mockingoose(loginTokenModel).toReturn([], "find");
        mockingoose(loginTokenModel).toReturn({ _id: new mongoose.Types.ObjectId("000000000000000000000000"), expires: Date.now() + 10 * 60 * 1000}, "save");
        const res = await supertest(app).put("/api/login").send({
            cf: "test", 
            name: "test", 
            surname: "test", 
            birthDate: 1234567890, 
            phoneNumber: "test", 
            email: "test", 
            address: "test", 
            password: "test", 
            subscriptionDate: 1234567890
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBe("000000000000000000000000");
    });
});