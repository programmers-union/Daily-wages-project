import { Request, Response } from "express";
import Client from '../models/Client';
import { generateAccessToken } from "../helpers/generateToken";

export const googleAuthCallback = (req: Request, res: Response) => {
  if (!req.user || typeof req.user !== 'object') {
    return res.status(400).send('User is not authenticated');
  }

  const token = generateAccessToken((req.user as any)._id.toString());
  res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
  res.redirect(`${process.env.API_URL}`);
  
};

export const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user !== 'object') {
    return res.status(400).send('User is not authenticated');
  }

  const client = await Client.findById((req.user as any)._id);
  if (!client) {
    return res.status(404).send('User not found');
  }

  res.send(client);
};

export const facebookAuth = async (req: Request, res: Response) => {
  console.log('someeeeeeeee')
}