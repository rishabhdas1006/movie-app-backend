import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signUpController = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(401).json({
				message: "Email and password required",
			});
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				message: "Email already present",
			});
		}

		const newUser = new User({
			email,
			password,
		});

		await newUser.save();

		const token = jwt.sign(
			{ userId: newUser._id },
			process.env.JWT_SECRET,
			{
				expiresIn: "30d",
			}
		);

		return res.status(201).json({
			message: "New user created",
			token,
			user: {
				email: newUser.email,
				savedMovies: newUser.savedMovies,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: "Sign up failed",
			error: error.message,
		});
	}
};

export const signInController = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: "Password is requied",
			});
		}

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(404).json({
				message: "No such user",
			});
		}

		if (existingUser.password != password) {
			return res.status(401).json({
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
		return res.status(500).json({
			message: "Sign up failed",
			error: error.message,
		});
	}
};
