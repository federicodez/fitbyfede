import { Avatar } from "@/components";
import SignOut from "./components/SignOut";
import { getWorkoutsByUserId } from "@/actions";
import Statistics from "./components/WorkoutStatistics";

const Profile = async () => {
  try {
    const workouts = await getWorkoutsByUserId();
    if (workouts) {
      return (
        <section className="profile wrapper container">
          <SignOut />
          <div className="profile-card">
            <h1 className="profile-title">Profile</h1>
            <Avatar />
          </div>
          <Statistics workouts={workouts} />
        </section>
      );
    }

    return (
      <section className="profile wrapper container">
        <SignOut />
        <div className="profile-card">
          <h1 className="profile-title">Profile</h1>
          <Avatar />
        </div>
      </section>
    );
  } catch (err) {
    console.log(err);
  }
};

export default Profile;
