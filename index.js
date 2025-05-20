import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import MainRouter from './routes/routesIndex.js';

const PORT = 3000;
const app = express();

// app.use(cors);

app.use("/api/v1", MainRouter)

app.get("/", (req, res) => {
  res.json({
    msg: "Health OK!"
  });
});

app.listen(PORT, () => {
  console.log(`App running on port port ${PORT}`);
});