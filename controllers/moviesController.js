import Movie from "../models/movieModel.js";

export const getAllMovieDetails = async (req, res) => {
	try {
		const movies = await Movie.find();

		return res.status(200).json({
			allMovieDetails: movies,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Failed to get all movie details",
			error: error.message,
		});
	}
};

export const getMovieDetails = async (req, res) => {
	try {
		const { movieId } = req.params;

		if (!movieId) {
			return res.status(401).json({
				message: "Movie ID required",
			});
		}

		const movie = await Movie.findById(movieId);

		if (!movie) {
			return res.status(404).json({
				message: "No such movie",
			});
		}

		return res.status(200).json({
			movieDetails: movie,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Failed to get movie details",
			error: error.message,
		});
	}
};

export const addMovieDetails = async (req, res) => {
	try {
		const { movieName, releaseDate, director, screenTime, cast } = req.body;

		if (!movieName || !releaseDate || !director || !screenTime || !cast) {
			return res.status(401).json({
				message: "Movie details required",
			});
		}

		const newMovie = new Movie({
			movieName,
			releaseDate,
			director,
			screenTime,
			cast,
		});

		await newMovie.save();

		return res.status(200).json({
			movieDetails: newMovie,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Failed to get movie details",
			error: error.message,
		});
	}
};
