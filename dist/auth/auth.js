"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.login = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../User/Models/user.model"));
const accessTokenSecret = 'bushDidNineEleven';
const refreshTokenSecret = 'bushDidNineElevenTwice';
let refreshTokens = [];
//middleware
exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
//endpoints
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await user_model_1.default.find(u => { return u.Username === username && u.Password === password; }).exec();
    if (user) {
        const accessToken = jsonwebtoken_1.default.sign({ username: user.Username, role: user.Role }, accessTokenSecret, { expiresIn: '20m' });
        const refreshToken = jsonwebtoken_1.default.sign({ username: user.Username, role: user.Role }, refreshTokenSecret);
        refreshTokens.push(refreshToken);
        res.json({
            accessToken,
            refreshToken
        });
    }
    else {
        res.send('Username or password incorrect');
    }
};
exports.refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }
    jsonwebtoken_1.default.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = jsonwebtoken_1.default.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
        res.json({ accessToken });
    });
};
exports.logout = (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.send("Logout successful");
};
//# sourceMappingURL=auth.js.map