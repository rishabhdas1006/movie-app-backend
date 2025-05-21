import User from "../models/userModel.js";

export const getUserDetails = async (req, res) => {
	try {
		const { userId } = req.params;

		const existingUser = await User.findById(userId);

		if (!existingUser) {
			return res.status(404).json({
				message: "No such user",
			});
		}

		return res.status(200).json({
			user: {
				userId: existingUser._id,
				email: existingUser.email,
				savedMovies: existingUser.savedMovies,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: "Failed to get user details",
			error: error.message,
		});
	}
};
