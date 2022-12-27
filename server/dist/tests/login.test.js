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
describe("POST /api/login", () => {
    it("should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post("/api/login");
        expect(res.status).toBe(400);
    }));
    it("should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.userModel).toReturn([], "find");
        const res = yield (0, supertest_1.default)(server_1.app).post("/api/login").send({
            email: "test",
            password: "test"
        });
        expect(res.status).toBe(401);
    }));
    it("should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.userModel).toReturn([{}], "find");
        mockingoose(dbModels_1.loginTokenModel).toReturn([{ _id: new mongoose_1.default.Types.ObjectId("000000000000000000000000"), expires: Date.now() + 10 * 60 * 1000 }], "find");
        const res = yield (0, supertest_1.default)(server_1.app).post("/api/login").send({
            email: "test",
            password: "test"
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBe("000000000000000000000000");
    }));
});
describe("POST /api/logout", () => {
    it("should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post("/api/logout");
        expect(res.status).toBe(400);
    }));
    it("should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.loginTokenModel).toReturn([{ expires: Date.now() + 10 * 60 * 1000 }], "find");
        const res = yield (0, supertest_1.default)(server_1.app).post("/api/logout").send({
            token: "1"
        });
        expect(res.status).toBe(200);
    }));
});
describe("PUT /api/login", () => {
    it("should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).put("/api/login");
        expect(res.status).toBe(400);
    }));
    it("should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.userModel).toReturn([{}], "find");
        const res = yield (0, supertest_1.default)(server_1.app).put("/api/login").send({
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
    }));
    it("should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        mockingoose(dbModels_1.userModel).toReturn([], "find");
        mockingoose(dbModels_1.userModel).toReturn({ /*  _id: new mongoose.Types.ObjectId("000000000000000000000000")  */}, "save");
        mockingoose(dbModels_1.loginTokenModel).toReturn([], "find");
        mockingoose(dbModels_1.loginTokenModel).toReturn({ _id: new mongoose_1.default.Types.ObjectId("000000000000000000000000"), expires: Date.now() + 10 * 60 * 1000 }, "save");
        const res = yield (0, supertest_1.default)(server_1.app).put("/api/login").send({
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
    }));
});
