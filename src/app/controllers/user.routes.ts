import express, { Request, Response } from "express";
import User from "../models/user.model";

const userRouter = express.Router();

//create user
userRouter.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  const newUser = await User.create(body);

  res.status(201).json({
    success: true,
    message: "User Created Successfully!",
    newUser,
  });
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
  const updatedBody = req.body;
  const updateUser = await User.findByIdAndUpdate(id, updatedBody, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Update a User Successfully",
    updateUser,
  });
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
