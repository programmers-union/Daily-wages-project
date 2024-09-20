import { Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { IUser } from "../models/Client";
import { genSaltSync, hashSync } from 'bcryptjs';


export const changePassword = async (
  newPassword: string,
  email: string,
  res: Response<{ msg: string; changed?: boolean }>,
  next: NextFunction,
  clientModel: Model<IUser>,
  employeeModel: Model<IUser>
) => {
  try {
    // Find the user (client or employee) by email
    const user = await clientModel.findOne({ email });
    const employee = await employeeModel.findOne({ email });

    // If neither is found, return a 404 error
    const account = user || employee;
    if (!account) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Hash the new password
    const salt = genSaltSync(10);
    const hash = hashSync(newPassword, salt);

    // Update the password
    account.password = hash;
    await account.save();

    // Send success response
    return res.status(200).json({ msg: "Password changed successfully", changed: true });
  } catch (error) {
    // Pass the error to the error handling middleware
    return next(error);
  }
};