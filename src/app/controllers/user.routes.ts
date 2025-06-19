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

    //it's instance methods to create user data
    // const user = new User(body);
    // const password = await user.hashPassword(body.password);
    // user.password = password;
    // const newUser = await user.save();

    //it's static method to create user data
    // const password = await User.hashPassword(body.password);
    // body.password = password;
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
  //filter method
  // const users = await User.find({email:req.query.email});
  //sorting method
  // const users = await User.find().sort({ email: "asc" });
  // const users = await User.find().sort({ email: "ascending" });
  // const users = await User.find().sort({ email: "dsc" });
  // const users = await User.find().sort({ email: "descending" });
  // const users = await User.find().sort({ email: 1 });
  // const users = await User.find().sort({ email: -1 });
  //Skipping Method
  // const users = await User.find().skip(5)
  //Limit Method
  // const users = await User.find().limit(3);

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
