import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import * as authController from './auth/auth';
import * as userController from './User/user';

mongoose.connect('mongodb://localhost:27017/LocalDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Ok')
  }).catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  });

const app = express();

app.use(bodyParser.json());

//auth.ts
app.post('/login', authController.login);
app.post('/token', authController.refreshToken);
app.post('/logout', authController.logout);

//user.ts
app.post('/register', userController.register);

//others
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
