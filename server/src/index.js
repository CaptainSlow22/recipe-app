import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.set("strictQuery", false)
mongoose.connect(
  "mongodb+srv://razvandumitru2002:DN8aqf303xk58v2y@recipes.bekqfvb.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get("/", (req,res) => {
  res.send("express is here")
})

app.listen(3001, () => console.log("Server started"));
