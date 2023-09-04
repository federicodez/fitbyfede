import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  name: String,
  exercises: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
});

const User = mongoose.models.Workout || mongoose.model("User", userSchema);

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
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

export { User, Workout };
