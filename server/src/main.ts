import Express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { ProductAPI } from "./api/productsApi";
import { LoginAPI } from "./api/loginApi";
import { CoursesAPI } from "./api/coursesApi";
import { MembershipAPI } from "./api/membershipsApi";

const pathToImages = path.resolve(path.join(__dirname, '../images/'));
const pathToProducts = path.resolve(path.join(pathToImages, '/products/'));
const database = "test"

//db connection to app db
const uri = `mongodb+srv://ingegneria_app:ingegneria_app@ingegneria.jfwum2t.mongodb.net/${database}?retryWrites=true&w=majority`;
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
}));

new ProductAPI(app);
new LoginAPI(app);
new CoursesAPI(app);
new MembershipAPI(app);

app.listen(3000, () => {
    console.log("server started");
});