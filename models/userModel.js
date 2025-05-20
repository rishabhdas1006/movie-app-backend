import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  savedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

export default mongoose.model("User", userSchema);
