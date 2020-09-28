"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUSer = exports.getUser = void 0;
const user_model_1 = __importDefault(require("../Models/user.model"));
exports.getUser = (req, res) => {
};
exports.postUSer = (req, res) => {
    let userScheme = user_model_1.default(req.body);
    userScheme.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.sendStatus(200);
        }
    });
};
//# sourceMappingURL=sample.js.map