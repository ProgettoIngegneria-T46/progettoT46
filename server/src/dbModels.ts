import mongoose from "mongoose";

//create product schema
const productSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

//create product model
export const productModel = mongoose.model("products", productSchema);
