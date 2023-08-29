import mongoose, { Schema } from "mongoose";

const workoutSchema = new Schema(
  {
    exercise: String,
    lbs: Number,
    sets: Number,
    reps: Number,
  },
  {
    timestamps: true,
  },
);

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

export default Workout;
