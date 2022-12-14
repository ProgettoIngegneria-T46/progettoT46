import mongoose from "mongoose";

//create product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

//create product model
export const productModel = mongoose.model("products", productSchema);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
});

export const userModel = mongoose.model("users", userSchema);

const loginTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    userID: { type: String, required: true },
});

export const loginTokenModel = mongoose.model("loginTokens", loginTokenSchema);
