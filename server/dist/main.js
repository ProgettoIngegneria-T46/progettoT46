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
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("./server");
const database = "test";
//db connection to app db
const uri = `mongodb+srv://ingegneria_app:ingegneria_app@ingegneria.jfwum2t.mongodb.net/${database}?retryWrites=true&w=majority`;
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(uri, () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("db connected");
}));
/* export const app = Express();
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
    res.sendFile(path.resolve(path.join(pathToImages, '/misc/notFound.png')));
}); */
server_1.app.listen(3000, () => {
    console.log("server started");
});
