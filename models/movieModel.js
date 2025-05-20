import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  movieName: String, 
  releaseDate: Date,
  director: String,
  screenTime: Number,
  cast: [String]
});

export default mongoose.model('Movie', movieSchema);