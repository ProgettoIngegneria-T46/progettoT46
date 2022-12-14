import mongoose from "mongoose";
import { loginTokenModel } from "./dbModels";

const tokenTime = 10 * 60 * 1000;


export const loginToken = async (userID: string) => {
    const _token = await loginTokenModel.find({ userID });
    if (_token && _token.length > 0) {
        console.log("Token found");
        //if token expired
        if (_token[0].expires < new Date()) {
            console.log("Token expired");
            await loginTokenModel.deleteOne({ _id: _token[0]._id });
            //generate token
            return generateToken(userID);
        }
        return _token[0]._id.toString();
    }
    //generate token
    console.log("Token not found");
    return generateToken(userID);
}

const generateToken = async (userID: string) => {
    //generate token
    //save token in db
    const loginToken = new loginTokenModel({
        userID,
        expires: new Date(Date.now() + tokenTime)
    });
    const token = await loginToken.save();
    return token._id.toString();
}

export const checkToken = async (token: string) => {
    const _token = await loginTokenModel.find({ _id: token });
    if (_token && _token.length > 0) {
        //if token expired
        if (_token[0].expires < new Date()) {
            await loginTokenModel.deleteOne({ _id: _token[0]._id }).catch(err => console.log(err));
            return false;
        }
        return true;
    }
    return false;
}

export const deleteToken = async (token: string) => {
    await loginTokenModel.deleteOne({ _id: token });
}
