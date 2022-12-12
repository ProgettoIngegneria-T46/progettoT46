import Express from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import cors from "cors";
import mongoose, { model } from "mongoose";
import { productModel } from "./dbModels";
import path from "path";
import fs from "fs";

const pathToImages = path.resolve(path.join(__dirname, '../images/'));
const pathToProducts = path.resolve(path.join(pathToImages, '/products/'));

//db connection
const uri = "mongodb+srv://ingegneria_app:ingegneria_app@ingegneria.jfwum2t.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(uri, () => {
    console.log("db connected");
});

const app = Express();
app.use(cors());
//set static folder
app.use(Express.static(pathToImages));
app.use(fileUpload({
    createParentPath: true
}))

app.get("/products", async (req, res) => {
    const ret = await productModel.find({});
    const returnData = ret.map( item => {
        return {
            id: item._id,
            name: item.name,
            price: item.price
        }
    });
    res.send(returnData);
});

app.get("/product/:productID", async (req, res) => {
    const ret = await productModel.find({ _id: req.params.productID });
    const returnData = ret.map( item => {
        return {
            id: item._id,
            name: item.name,
            price: item.price
        }
    });
    if(returnData.length == 0){
        res.status(404).send("product not found");
        return;
    }
    res.status(200).send(returnData);
});

app.get("/product/:productID/image", async (req, res) => {
    //return image from images/products folder with name = productID
    const p = pathToProducts + req.params.productID + ".jpg";
    console.log(p);
    if(!fs.existsSync(p)){
        res.status(404).send("image not found");
        return;
    }
    res.sendFile(p);
});

app.put("/product/:productID", async(req, res) => {
    if(!req.files || !req.body.name || !req.body.price){
        res.status(400).send("invalid request");
        return;
    }
    const file = req.files.file;
    (file as UploadedFile).mv(path.join(pathToProducts, req.params.productID + ".png"));
    //add product to db
    const product = new productModel({
        _id: req.params.productID,
        name: req.body.name,
        price: req.body.price
    });
    await product.save();
    res.status(200).send("ok");
})

app.listen(3000, () => {
    console.log("server started");
});