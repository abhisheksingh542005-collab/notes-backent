import express from "express";
import cors from "cors";
import connectToMongo from "./server/config/user.js";
import userroutes from "./server/routes/user.js";
import noteroutes from "./server/routes/note.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

// Middleware: Har request aane par DB connection wait karega
app.use(async (req, res, next) => {
  try {
    await connectToMongo();
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Database connection error",
      error: error.message,
    });
  }
});

app.use("/api/v1/user", userroutes);
app.use("/api/v1/notes", noteroutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



