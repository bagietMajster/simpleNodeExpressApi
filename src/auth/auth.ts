import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../User/Models/user.model';

const accessTokenSecret = 'bushDidNineEleven';
const refreshTokenSecret = 'bushDidNineElevenTwice';
let refreshTokens = [];
  
//middleware
export let authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

//endpoints
export let login = async (req: Request, res: Response) => {
   const { username, password } = req.body;

   const user = await User.find(u => { return u.Username === username && u.Password === password }).exec();

   if (user) {
       const accessToken = jwt.sign({ username: user.Username, role: user.Role }, accessTokenSecret, { expiresIn: '20m' });
       const refreshToken = jwt.sign({ username: user.Username, role: user.Role }, refreshTokenSecret);

       refreshTokens.push(refreshToken);

       res.json({
           accessToken,
           refreshToken
       });
   } else {
       res.send('Username or password incorrect');
   }
}

export let refreshToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({ accessToken });
    });
};

export let logout = (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
};