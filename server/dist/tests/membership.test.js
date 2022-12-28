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
const server_1 = require("../server");
const supertest_1 = __importDefault(require("supertest"));
const dbModels_1 = require("../dbModels");
const mongoose_1 = __importDefault(require("mongoose"));
const mockingoose = require("mockingoose");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    mockingoose.resetAll();
}));
describe("GET /api/memberships", () => {
    it("should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.membershipModel).toReturn([], "find");
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/memberships");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    }));
    it("should return no elements", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.membershipModel).toReturn([], "find");
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/memberships");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBe(0);
    }));
    it("should return at least one element", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.membershipModel).toReturn([{}], "find");
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/memberships");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    }));
});
describe("GET /api/membership/:membershipID", () => {
    it("should return 404", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.membershipModel).toReturn([], "find");
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/membership/1");
        expect(res.status).toBe(404);
    }));
    it("should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.membershipModel).toReturn([{}], "find");
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/membership/1");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    }));
});
// 63a4b9d307766d7e849fe253
describe("GET /api/membership/:membershipID/image", () => {
    it("should return 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/membership/1/image");
        expect(res.status).toBe(404);
    }));
    it("should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/membership/63a5ba2dc960327f84435083/image");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    }));
});
describe("PUT /api/membership", () => {
    it("should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).put("/api/membership");
        expect(res.status).toBe(400);
    }));
    it("should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.loginTokenModel).toReturn([{ expires: Date.now() + 10 * 60 * 1000 }], "find");
        mockingoose(dbModels_1.loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(dbModels_1.userModel).toReturn({ isAdmin: false }, "findOne");
        mockingoose(dbModels_1.membershipModel).toReturn({ _id: new mongoose_1.default.Types.ObjectId("000000000000000000000000") }, "save");
        const res = yield (0, supertest_1.default)(server_1.app).put("/api/membership")
            .field("token", "1")
            .field("name", "testMembership")
            .field("description", "testDescription")
            .field("price", 1.99)
            .field("endDate", Date.now() + 10 * 60 * 1000)
            .attach("file", __dirname + "\\..\\..\\images\\misc\\notFound.png");
        expect(res.status).toBe(401);
    }));
    it("should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.loginTokenModel).toReturn([{ expires: Date.now() + 10 * 60 * 1000 }], "find");
        mockingoose(dbModels_1.loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(dbModels_1.userModel).toReturn({ isAdmin: true }, "findOne");
        mockingoose(dbModels_1.membershipModel).toReturn({ _id: new mongoose_1.default.Types.ObjectId("000000000000000000000000") }, "save");
        const res = yield (0, supertest_1.default)(server_1.app).put("/api/membership")
            .field("token", "1")
            .field("name", "testMembership")
            .field("description", "testDescription")
            .field("price", 1.99)
            .field("endDate", Date.now() + 10 * 60 * 1000)
            .attach("file", __dirname + "\\..\\..\\images\\misc\\notFound.png");
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    }));
});
describe("DELETE /api/membership", () => {
    it("should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).delete("/api/membership");
        expect(res.status).toBe(400);
    }));
    it("should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.loginTokenModel).toReturn([{ expires: Date.now() + 10 * 60 * 1000 }], "find");
        mockingoose(dbModels_1.loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(dbModels_1.userModel).toReturn({ isAdmin: false }, "findOne");
        const res = yield (0, supertest_1.default)(server_1.app).delete("/api/membership").send({
            token: "1",
            membershipID: "000000000000000000000000"
        });
        expect(res.status).toBe(401);
    }));
    it("should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.loginTokenModel).toReturn([{ expires: Date.now() + 10 * 60 * 1000 }], "find");
        mockingoose(dbModels_1.loginTokenModel).toReturn({ userID: 0 }, "findOne");
        mockingoose(dbModels_1.userModel).toReturn({ isAdmin: true }, "findOne");
        const res = yield (0, supertest_1.default)(server_1.app).delete("/api/membership").send({
            token: "1",
            membershipID: "000000000000000000000000"
        });
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    }));
});
