import { app } from "../server";
import supertest from "supertest";
import { loginTokenModel, membershipModel, userModel } from "../dbModels";

const mockingoose = require("mockingoose");

beforeEach(async () => {
    mockingoose.resetAll();
});

describe("GET /api/notfound/image", () => {
    it("should return 200", async () => {
        const res = await supertest(app).get("/api/notfound/image");
        expect(res.status).toBe(200);
    });
});