import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User, { IUser } from './Models/user.model';

export let register = (req: Request, res: Response) => {
  let userScheme = User(req.body);
  userScheme.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
 };
