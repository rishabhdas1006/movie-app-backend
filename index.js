import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";

import MainRouter from './routes/routesIndex.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(() => {
	console.log("Connected to DB");
});

app.use("/api/v1", MainRouter)

app.get("/health", (req, res) => {
  res.json({
    msg: "Health OK!"
  });
});

app.listen(PORT, () => {
  console.log(`App running on port port ${PORT}`);
});