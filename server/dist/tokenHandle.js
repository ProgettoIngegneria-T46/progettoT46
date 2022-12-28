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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToken = exports.isAdmin = exports.checkToken = exports.loginToken = void 0;
const dbModels_1 = require("./dbModels");
const tokenTime = 10 * 60 * 1000;
const loginToken = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const _token = yield dbModels_1.loginTokenModel.find({ userID });
    if (_token && _token.length > 0) {
        // console.log("Token found");
        //if token expired
        if (_token[0].expires < new Date()) {
            console.log("Token expired");
            yield dbModels_1.loginTokenModel.deleteOne({ _id: _token[0]._id });
            //generate token
            return generateToken(userID);
        }
        return _token[0]._id.toString();
    }
    //generate token
    // console.log("Token not found");
    return generateToken(userID);
});
exports.loginToken = loginToken;
const generateToken = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    //generate token
    //save token in db
    const loginToken = new dbModels_1.loginTokenModel({
        userID,
        expires: new Date(Date.now() + tokenTime)
    });
    const token = yield loginToken.save();
    return token._id.toString();
});
const checkToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const _token = yield dbModels_1.loginTokenModel.find({ _id: token });
    if (_token && _token.length > 0) {
        //if token expired
        if (_token[0].expires < new Date()) {
            yield dbModels_1.loginTokenModel.deleteOne({ _id: _token[0]._id }).catch(err => console.log(err));
            return false;
        }
        return true;
    }
    return false;
});
exports.checkToken = checkToken;
const isAdmin = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, exports.checkToken)(token)) {
        return false;
    }
    const user = yield dbModels_1.loginTokenModel.findOne({ _id: token });
    if (!user) {
        return false;
    }
    const ret = yield dbModels_1.userModel.findOne({ _id: user.userID });
    return (ret === null || ret === void 0 ? void 0 : ret.isAdmin) || false;
});
exports.isAdmin = isAdmin;
const deleteToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    yield dbModels_1.loginTokenModel.deleteOne({ _id: token });
});
exports.deleteToken = deleteToken;
