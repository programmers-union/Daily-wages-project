import { Request, Response, NextFunction } from "express";
import Client from '../models/Client';
import { generateToken } from "../helpers/generateToken";


export const googleAuthCallback = (req: Request, res: Response) => {
  if (!req.user || typeof req.user !== 'string') {
    return res.status(400).send('User is not authenticated');
  }
  
  const token = generateToken(req.user);
  res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
  res.redirect(`${process.env.CLIENT_URL}/auth?token=${token}`);
};

export const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user !== 'string') {
    return res.status(400).send('User is not authenticated');
  }

  const client = await Client.findById(req.user);
  if (!client) {
    return res.status(404).send('User not found');
  }

  res.send(client);
};
