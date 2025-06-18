import { Types } from "mongoose";

export interface INotes {
  title: string;
  content: string;
  category: "personal" | "study" | "work" | "other";
  pinned: boolean;
  tags: {
    label: string;
    color: string;
  };
  user: Types.ObjectId;
}
