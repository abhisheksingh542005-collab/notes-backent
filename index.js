import express from "express";
import cors from"cors";
import connectToMongo from "./server/config/user.js";
import userroutes from"./server/routes/user.js";
import noteroutes from"./server/routes/note.routes.js";

const app = express();
app.use(express.json());
app.use(cors());


connectToMongo();
app.use("/api/v1/user",userroutes);
app.use("/api/v1/notes",noteroutes);

const port=5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});




