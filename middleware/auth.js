import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticateJWT = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header missing or malformed",
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(404).json({
        message: "Invalid token",
      });
    }

    const user = User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export const checkPassword = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Password is requied",
      });
    }

    const user = User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "No such user",
      });
    }

    if (user.password !== password) {
      res.status(401).json({
        message: "Wrong password",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};
