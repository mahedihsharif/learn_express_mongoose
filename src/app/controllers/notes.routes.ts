import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";
const notesRouter = express.Router();

//create note
notesRouter.post("/create-note", async (req: Request, res: Response) => {
  //approach 1
  // const myNote = new Note({
  //   title: "Learning Mongoose",
  //   content: true,
  // });
  // const noteSaved = await myNote.save();
  // const noteSaved = await note.save();

  //roach 2
  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully!",
    note,
  });
});

//get all notes
notesRouter.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(200).json({
    success: true,
    message: "All Notes Successfully",
    notes,
  });
});

//get a single note
notesRouter.get("/:id", async (req: Request, res: Response) => {
  console.log("inside single note method");
  const { id } = req.params;
  const note = await Note.findById(id);

  res.status(200).json({
    success: true,
    message: "A Single Note Successfully",
    note,
  });
});

//update a note
notesRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(id, updatedBody, { new: true });
  // const note = await Note.updateOne({ _id: id }, updatedBody, { new: true });
  // const note = await Note.findOneAndUpdate({ _id: id }, updatedBody, {
  //   new: true,
  // });

  res.status(200).json({
    success: true,
    message: "update a note successfully",
    note,
  });
});

//update a note
notesRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  // const note = await Note.findByIdAndDelete(id);
  // const note = await Note.deleteOne({ _id: id });
  const note = await Note.findOneAndDelete({ _id: id });

  res.status(200).json({
    success: true,
    message: "Delete a Note Successfully",
    note,
  });
});

export default notesRouter;
