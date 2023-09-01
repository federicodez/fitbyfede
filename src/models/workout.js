import mongoose, { Schema } from "mongoose";

const workoutSchema = new Schema(
  {
    exercise: String,
    lbs: [Number],
    reps: [Number],
    notes: String,
  },
  {
    timestamps: true,
  },
);

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

export default Workout;
