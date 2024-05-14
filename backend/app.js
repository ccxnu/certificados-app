import express from "express";
import { certRouter } from "./routes/cert.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by");

app.use("/api/user", certRouter);

app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000");
});
