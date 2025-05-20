import express from "express";
import { signUpController, signInController } from "../controllers/authController.js";
import { checkPassword } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", checkPassword, signInController);

export default router;
