import express from 'express';
import {getMovieDetails, getAllMovieDetails} from '../controllers/moviesController.js'

const router = express.Router();

router.get("/allMovieDetails", getAllMovieDetails);
router.get("/movieDetails/movieId", getMovieDetails);

export default router;