import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signUpController = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({
        message: "Email and password required",
      });
    }

    const existingUser = User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "Email already present",
      });
    }

    const newUser = new User({
      email,
      password,
    });

    newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      message: "New user created",
      token,
      user: {
        email,
        savedMovies,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Sign up failed",
      error: error.message,
    });
  }
};

export const signInController = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Password is requied",
      });
    }

    const existingUser = User.findOne({ email });

    if (!existingUser) {
      res.status(404).json({
        message: "No such user",
      });
    }

    if (existingUser.password !== password) {
      res.status(401).json({
        message: "Wrong password",
      });
    }

    return res.status(200).json({
      user: {
        email: existingUser.email,
        savedMovies: existingUser.savedMovies,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Sign up failed",
      error: error.message,
    });
  }
};
