import express, { Application, Request, Response } from "express";
import notesRouter from "./controllers/notes.routes";
import userRouter from "./controllers/user.routes";
const app: Application = express();
app.use(express.json());

app.use("/notes", notesRouter);
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to todo app!");
});

export default app;
