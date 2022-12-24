import Express from "express";
import path from "path";
import { productModel } from "../dbModels";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { isAdmin } from "../tokenHandle";
import { notFoundImage } from "../server";

export class ProductAPI {
    constructor(private app: Express.Application) {
        this.app.get("/api/products", this.getProducts);
        this.app.get("/api/product/:productID", this.getProduct);
        this.app.get("/api/product/:productID/image", this.getProductImage);
        this.app.put("/api/product", this.putProduct);
        this.app.delete("/api/product", this.deleteProduct);
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
                    price: item.price,
                    description: item.description,
                }
            });
            res.send(returnData);
        } catch (err) {
            // console.log(err);
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
            // console.log(err);
            res.status(500).send("error");
            return;
        }
    }

    private getProductImage = async (req: Express.Request, res: Express.Response) => {
        //return image from images/products folder with name = productID
        const p = path.join(this.pathToProducts, req.params.productID + ".png");
        // console.log(p);
        if (!fs.existsSync(p)) {
            // res.status(404).send("image not found");
            res.status(404).sendFile(notFoundImage);
            return;
        }
        res.sendFile(p);
    }

    private putProduct = async (req: Express.Request, res: Express.Response) => {
        const { token } = req.body;
        if (!token || !req.files || !req.body.name || !req.body.price || !req.body.description) {
            // console.log("Invalid request");
            res.status(400).send("invalid request");
            return;
        }
        if (!(await isAdmin(token))){
            res.status(401).send("invalid token");
            return;
        }
        const product = new productModel({
            name: req.body.name,
            price: req.body.price, 
            description: req.body.description,
        });
        const p = await product.save();
        // console.log(p._id);
        
        const file = req.files.file;
        (file as UploadedFile).mv(path.join(this.pathToProducts, p._id + ".png"));
        
        res.status(200).send("ok");
    }

    private deleteProduct = async (req: Express.Request, res: Express.Response) => {
        const { token, productID } = req.body;
        if (!token || !productID) {
            res.status(400).send("invalid request");
            return;
        }
        if (!(await isAdmin(token))){
            res.status(401).send("invalid token");
            return;
        }
        await productModel.deleteOne({ _id: productID });
        fs.rmSync(path.join(this.pathToProducts, productID + ".png"));
        res.status(200).send("ok");
    }
}