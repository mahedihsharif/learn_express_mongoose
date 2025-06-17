import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = 5000;
async function main() {
  await mongoose.connect(
    "mongodb+srv://note_user:note_pass@cluster0.r5awo.mongodb.net/note_app?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("mongodb connected successfully!");
  try {
    server = app.listen(PORT, () => {
      console.log(`App is listening ar port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
