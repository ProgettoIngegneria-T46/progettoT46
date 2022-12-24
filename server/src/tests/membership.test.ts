import { app } from "../server";
import supertest from "supertest";
import { loginTokenModel, membershipModel, userModel } from "../dbModels";

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
        const res = await supertest(app).get("/api/membership/63a62358449ef3d9f6f6c2da/image");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

describe("PUT /api/membership", () => {
    it("should return 400", async () => {
        const res = await supertest(app).put("/api/membership");
        expect(res.status).toBe(400);
    });
    
    // it("should return 200", async () => {
    //     mockingoose(loginTokenModel).toReturn([{expires: new Date()}]);
    //     mockingoose(userModel).toReturn({_id: "1", isAdmin: true}, "findOne");
    //     const res = await supertest(app).put("/api/membership").send({
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