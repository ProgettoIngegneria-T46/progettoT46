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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAPI = void 0;
const path_1 = __importDefault(require("path"));
const dbModels_1 = require("../dbModels");
const fs_1 = __importDefault(require("fs"));
const tokenHandle_1 = require("../tokenHandle");
const server_1 = require("../server");
class ProductAPI {
    constructor(app) {
        this.app = app;
        this.pathToImages = path_1.default.resolve(path_1.default.join(__dirname, '../../images/'));
        this.pathToProducts = path_1.default.resolve(path_1.default.join(this.pathToImages, '/products/'));
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield dbModels_1.productModel.find({});
                const returnData = ret.map(item => {
                    return {
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        description: item.description,
                    };
                });
                res.send(returnData);
            }
            catch (err) {
                // console.log(err);
                res.status(500).send("error");
                return;
            }
        });
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield dbModels_1.productModel.find({ _id: req.params.productID });
                const returnData = ret.map(item => {
                    return {
                        id: item._id,
                        name: item.name,
                        price: item.price
                    };
                });
                if (returnData.length == 0) {
                    res.status(404).send("product not found");
                    return;
                }
                res.status(200).send(returnData[0]);
            }
            catch (err) {
                // console.log(err);
                res.status(500).send("error");
                return;
            }
        });
        this.getProductImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //return image from images/products folder with name = productID
            const p = path_1.default.join(this.pathToProducts, req.params.productID + ".png");
            // console.log(p);
            if (!fs_1.default.existsSync(p)) {
                // res.status(404).send("image not found");
                res.status(404).sendFile(server_1.notFoundImage);
                return;
            }
            res.sendFile(p);
        });
        this.putProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { token } = req.body;
            if (!token || !((_a = req.files) === null || _a === void 0 ? void 0 : _a.file) || !req.body.name || !req.body.price || !req.body.description) {
                // console.log("Invalid request");
                res.status(400).send("invalid request");
                return;
            }
            if (!(yield (0, tokenHandle_1.isAdmin)(token))) {
                res.status(401).send("invalid token");
                return;
            }
            const product = new dbModels_1.productModel({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            });
            const p = yield product.save();
            // console.log(p._id);
            const file = req.files.file;
            file.mv(path_1.default.join(this.pathToProducts, p._id + ".png"));
            res.status(200).send({ id: p._id });
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token, productID } = req.body;
            if (!token || !productID) {
                res.status(400).send("invalid request");
                return;
            }
            if (!(yield (0, tokenHandle_1.isAdmin)(token))) {
                res.status(401).send("invalid token");
                return;
            }
            yield dbModels_1.productModel.deleteOne({ _id: productID });
            fs_1.default.rmSync(path_1.default.join(this.pathToProducts, productID + ".png"));
            res.status(200).send("ok");
        });
        this.app.get("/api/products", this.getProducts);
        this.app.get("/api/product/:productID", this.getProduct);
        this.app.get("/api/product/:productID/image", this.getProductImage);
        this.app.put("/api/product", this.putProduct);
        this.app.delete("/api/product", this.deleteProduct);
    }
}
exports.ProductAPI = ProductAPI;
