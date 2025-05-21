import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
	movieName: {
		type: String,
	},
	releaseDate: {
		type: Date,
	},
	director: {
		type: String,
	},
	screenTime: {
		type: Number,
	},
	cast: {
		type: [String],
	},
});

export default mongoose.model("Movie", movieSchema);
