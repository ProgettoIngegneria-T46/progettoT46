import mongoose from "mongoose";

//create product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    styles: { type: Array<String>, required: false },
});

//create product model
export const productModel = mongoose.model("products", productSchema);

const userSchema = new mongoose.Schema({
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

export const userModel = mongoose.model("users", userSchema);

const loginTokenSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    expires: { type: Date, required: true },
});

export const loginTokenModel = mongoose.model("loginTokens", loginTokenSchema);

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: false},
    endDate: {type: Date, required: true},
    subscriptions: {type: Number, required: false}
});

export const courseModel = mongoose.model("courses", courseSchema);
