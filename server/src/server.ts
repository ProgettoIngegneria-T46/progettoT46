import cors from "cors";
import Express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { CoursesAPI } from "./api/coursesApi";
import { LoginAPI } from "./api/loginApi";
import { MembershipAPI } from "./api/membershipsApi";
import { ProductAPI } from "./api/productsApi";

const pathToImages = path.resolve(path.join(__dirname, '../images/'));
//const pathToProducts = path.resolve(path.join(pathToImages, '/products/'));
export const notFoundImage = path.resolve(path.join(pathToImages, '/misc/notFound.png'));

export const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.static(pathToImages));
app.use(fileUpload({
    createParentPath: true
}));

new ProductAPI(app);
new LoginAPI(app);
new CoursesAPI(app);
new MembershipAPI(app);

app.get("/api/notfound/image", (req, res) => {
    // set return to file
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.resolve(path.join(pathToImages, '/misc/notFound.png')));
});