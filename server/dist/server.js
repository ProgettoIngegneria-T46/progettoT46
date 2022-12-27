"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.notFoundImage = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const coursesApi_1 = require("./api/coursesApi");
const loginApi_1 = require("./api/loginApi");
const membershipsApi_1 = require("./api/membershipsApi");
const productsApi_1 = require("./api/productsApi");
const pathToImages = path_1.default.resolve(path_1.default.join(__dirname, '../images/'));
//const pathToProducts = path.resolve(path.join(pathToImages, '/products/'));
exports.notFoundImage = path_1.default.resolve(path_1.default.join(pathToImages, '/misc/notFound.png'));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static(pathToImages));
exports.app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
new productsApi_1.ProductAPI(exports.app);
new loginApi_1.LoginAPI(exports.app);
new coursesApi_1.CoursesAPI(exports.app);
new membershipsApi_1.MembershipAPI(exports.app);
exports.app.get("/api/notfound/image", (req, res) => {
    // set return to file
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path_1.default.resolve(path_1.default.join(pathToImages, '/misc/notFound.png')));
});
