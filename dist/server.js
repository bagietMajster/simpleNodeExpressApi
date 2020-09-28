"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authController = __importStar(require("./auth/auth"));
const userController = __importStar(require("./User/user"));
mongoose_1.default.connect('mongodb://localhost:27017/LocalDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Ok');
}).catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
});
const app = express_1.default();
app.use(body_parser_1.default.json());
//auth.ts
app.post('/login', authController.login);
app.post('/token', authController.refreshToken);
app.post('/logout', authController.logout);
//user.ts
app.post('/register', userController.register);
//others
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));
//# sourceMappingURL=server.js.map