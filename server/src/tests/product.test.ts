import { app } from "../server";
import supertest from "supertest";
import { loginTokenModel, productModel, userModel } from "../dbModels";
import mongoose, { ObjectId } from "mongoose";

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

describe("GET /api/products", () => {
    it("should return 200", async () => {
        mockingoose(productModel).toReturn([], "find");
        const res = await supertest(app).get("/api/products");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBe(0);
    });

    it("should return no elements", async () => {
        mockingoose(productModel).toReturn([], "find");
        const res = await supertest(app).get("/api/products");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBe(0);
    });
    
    it("should return at least one element", async () => {
        mockingoose(productModel).toReturn([{}], "find");
        const res = await supertest(app).get("/api/products");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET /api/product/:productID", () => {
    it("should return 404", async () => {
        mockingoose(productModel).toReturn([], "find");
        const res = await supertest(app).get("/api/product/1");
        expect(res.status).toBe(404);
    });
    
    it("should return 200", async () => {
        mockingoose(productModel).toReturn([{}], "find");
        const res = await supertest(app).get("/api/product/1");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});
// 63a4b9d307766d7e849fe253
describe("GET /api/product/:product/image", () => {
    it("should return 404", async () => {
        const res = await supertest(app).get("/api/product/1/image");
        expect(res.status).toBe(404);
    });
    
    it("should return 200", async () => {
        const res = await supertest(app).get("/api/product/63a4b9d307766d7e849fe253/image");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

describe("PUT /api/product", () => {
    it("should return 400", async () => {
        const res = await supertest(app).put("/api/product");
        expect(res.status).toBe(400);
    });

    it("should return 401", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: false }, "findOne");
        mockingoose(productModel).toReturn({ _id: new mongoose.Types.ObjectId("000000000000000000000000")}, "save");
        const res = await supertest(app).put("/api/product")
            .field("token", "1")
            .field("name", "testProduct")
            .field("description", "testDescription")
            .field("price", 1.99)
            .attach("file", "C:\\Users\\micle\\Documents\\programmi\\Node\\progettoT46\\server\\images\\products\\TshirtChadGym.png");
        expect(res.status).toBe(401);
    });
    
    it("should return 200", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: true }, "findOne");
        mockingoose(productModel).toReturn({ _id: new mongoose.Types.ObjectId("000000000000000000000000")}, "save");
        const res = await supertest(app).put("/api/product")
            .field("token", "1")
            .field("name", "testProduct")
            .field("description", "testDescription")
            .field("price", 1.99)
            .attach("file", "C:\\Users\\micle\\Documents\\programmi\\Node\\progettoT46\\server\\images\\products\\TshirtChadGym.png");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

describe("DELETE /api/product", () => {
    it("should return 400", async () => {
        const res = await supertest(app).delete("/api/product");
        expect(res.status).toBe(400);
    });
    
    it("should return 401", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: false }, "findOne");
        const res = await supertest(app).delete("/api/product").send(
            {
                token: "1", 
                productID: "000000000000000000000000"
            });
        expect(res.status).toBe(401);
    });

    it("should return 200", async () => {
        mockingoose(loginTokenModel).toReturn([{expires: Date.now() + 10 * 60 * 1000}], "find");
        mockingoose(loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(userModel).toReturn({ isAdmin: true }, "findOne");
        const res = await supertest(app).delete("/api/product").send(
            {
                token: "1", 
                productID: "000000000000000000000000"
            });
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    });
});

