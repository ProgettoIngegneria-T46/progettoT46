import Express from "express";
import path from "path";
import { productModel } from "../dbModels";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import mongoose from "mongoose";
import { checkToken } from "../tokenHandle";

export class ProductAPI {
    constructor(private app: Express.Application) {
        this.app.get("/api/products", this.getProducts);
        this.app.get("/api/product/:productID", this.getProduct);
        this.app.get("/api/product/:productID/image", this.getProductImage);
        this.app.put("/api/product", this.putProduct);
    }

    private readonly pathToImages = path.resolve(path.join(__dirname, '../../images/'));
    private readonly pathToProducts = path.resolve(path.join(this.pathToImages, '/products/'));

    private getProducts = async (req: Express.Request, res: Express.Response) => {
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
    }

    private getProduct = async (req: Express.Request, res: Express.Response) => {
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
    }

    private getProductImage = async (req: Express.Request, res: Express.Response) => {
        //return image from images/products folder with name = productID
        const p = path.join(this.pathToProducts, req.params.productID + ".png");
        console.log(p);
        if (!fs.existsSync(p)) {
            res.status(404).send("image not found");
            return;
        }
        res.sendFile(p);
    }

    private putProduct = async (req: Express.Request, res: Express.Response) => {
        if (!req.files || !req.body.name || !req.body.price) {
            res.status(400).send("invalid request");
            return;
        }
        console.log(req.files);
        //add product to db
        const product = new productModel({
            name: req.body.name,
            price: req.body.price
        });
        const p = await product.save();

        const file = req.files.file;
        (file as UploadedFile).mv(path.join(this.pathToProducts, p._id + ".png"));

        res.status(200).send("ok");
    }

    private deleteProduct = async (req: Express.Request, res: Express.Response) => {
        const { token, productID } = req.body;
        if (!(await checkToken(token))){
            res.status(401).send("invalid token");
            return;
        }
        await productModel.deleteOne({ _id: productID });
        res.status(200).send("ok");
    }
}