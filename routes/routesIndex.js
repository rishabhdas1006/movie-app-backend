import express from "express";
import AuthRouter from "./authRouter.js";
import MovieRouter from "./movieRouter.js";
import UserRouter from "./userRouter.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/movies", MovieRouter);
router.use("/user", UserRouter);

export default router;
