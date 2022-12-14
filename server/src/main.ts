import Express from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import cors from "cors";
import mongoose, { model } from "mongoose";
import { loginTokenModel, productModel, userModel } from "./dbModels";
import path from "path";
import fs from "fs";

const pathToImages = path.resolve(path.join(__dirname, '../images/'));
const pathToProducts = path.resolve(path.join(pathToImages, '/products/'));

//db connection
const uri = "mongodb+srv://ingegneria_app:ingegneria_app@ingegneria.jfwum2t.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(uri, async () => {
    console.log("db connected");

});

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.static(pathToImages));
app.use(fileUpload({
    createParentPath: true
}))

app.get("/api/products", async (req, res) => {
    try {
        const ret = await productModel.find({});
        const returnData = ret.map(item => {
            return {
                id: item._id,
                name: item.name,
                price: item.price
            }
        });
        res.send(returnData);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
        return;
    }
});

app.get("/api/product/:productID", async (req, res) => {
    try {
        const ret = await productModel.find({ _id: req.params.productID });
        const returnData = ret.map(item => {
            return {
                id: item._id,
                name: item.name,
                price: item.price
            }
        });
        if (returnData.length == 0) {
            res.status(404).send("product not found");
            return;
        }
        res.status(200).send(returnData[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
        return;
    }
});

app.get("/api/product/:productID/image", async (req, res) => {
    //return image from images/products folder with name = productID
    const p = path.join(pathToProducts, req.params.productID + ".png");
    console.log(p);
    if (!fs.existsSync(p)) {
        res.status(404).send("image not found");
        return;
    }
    res.sendFile(p);
});

app.put("/api/product/:productID", async (req, res) => {
    if (!req.files || !req.body.name || !req.body.price) {
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
});

app.post("api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send("invalid request: email or password missing");
        return;
    }
    //check if user exists
    //if exists, generate token and save it in db
    //return token
    const user = await userModel.find({ email, password });
    if (user.length == 0) {
        res.status(401).send("invalid credentials");
        return;
    }
    //generate token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    //save token in db
    const loginToken = new loginTokenModel({
        token,
        userID: user[0]._id
    });
    await loginToken.save();
    res.status(200).send(token);
})

app.listen(3000, () => {
    console.log("server started");
});