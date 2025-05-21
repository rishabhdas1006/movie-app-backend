import express from 'express';
import {getMovieDetails, getAllMovieDetails, addMovieDetails} from '../controllers/moviesController.js'

const router = express.Router();

router.get("/", getAllMovieDetails);
router.get("/:movieId", getMovieDetails);
router.post("/", addMovieDetails);

export default router;