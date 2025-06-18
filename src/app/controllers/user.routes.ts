import bcrypt from "bcrypt";
import express, { Request, Response } from "express";

import { z } from "zod";
import User from "../models/user.model";
const userRouter = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

//create user
userRouter.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await CreateUserZodSchema.parseAsync(req.body);
    const body = await req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const newUser = await User.create(body);
    res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      newUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

//get all user
userRouter.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: "All User Find Successfully",
    users,
  });
});

//get a single user
userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    message: "User Find Successfully",
    user,
  });
});

//update a note
userRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedBody = await CreateUserZodSchema.parseAsync(req.body);
    const updateUser = await User.findByIdAndUpdate(id, updatedBody, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Update a User Successfully",
      updateUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

//update a user
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleteUser = await User.findOneAndDelete({ _id: id });

  res.status(200).json({
    success: true,
    message: "Delete a User Successfully",
    deleteUser,
  });
});

export default userRouter;
