import { model, Schema } from "mongoose";
import { INotes } from "../interface/notes.interface";

const noteSchema = new Schema<INotes>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["personal", "study", "work", "other"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, require: true },
      color: { type: String, default: "gray" },
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: true }
);

export const Note = model("Note", noteSchema);
