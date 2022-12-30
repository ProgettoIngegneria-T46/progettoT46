"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.membershipModel = exports.courseModel = exports.loginTokenModel = exports.userModel = exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    styles: { type: (Array), required: false },
});
exports.productModel = mongoose_1.default.model("products", productSchema);
const userSchema = new mongoose_1.default.Schema({
    cf: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthDate: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    subscriptionDate: { type: Date, required: false },
    code: { type: String, required: false },
});
exports.userModel = mongoose_1.default.model("users", userSchema);
const loginTokenSchema = new mongoose_1.default.Schema({
    userID: { type: String, required: true },
    expires: { type: Date, required: true },
});
exports.loginTokenModel = mongoose_1.default.model("loginTokens", loginTokenSchema);
const courseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    endDate: { type: Date, required: true },
    subscriptions: { type: Number, required: false }
});
exports.courseModel = mongoose_1.default.model("courses", courseSchema);
const membershipSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    endDate: { type: Date, required: true }
});
exports.membershipModel = mongoose_1.default.model("memberships", membershipSchema);
