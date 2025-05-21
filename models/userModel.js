import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	savedMovies: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Movie",
		default: [],
	},
});

export default mongoose.model("User", userSchema);
