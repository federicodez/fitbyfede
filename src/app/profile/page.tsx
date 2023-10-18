import { Avatar } from "@/components";
import Statistics from "./components/WorkoutStatistics";
import { getWorkouts } from "@/actions";

const Profile = async () => {
  try {
    const workouts = await getWorkouts();
    return (
      <section className="profile wrapper container">
        <div className="profile-card">
          <h1 className="profile-title">Profile</h1>
          <Avatar />
        </div>
        {workouts ? <Statistics workouts={workouts} /> : null}
      </section>
    );
  } catch (err) {
    console.log(err);
  }
};

export default Profile;
