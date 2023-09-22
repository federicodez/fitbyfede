import { Avatar } from "@/components";
import Navbar from "@/components/navbar/Navbar";
import Statistics from "./components/WorkoutStatistics";
import { getWorkouts } from "@/actions";

const Profile = async () => {
  try {
    const workouts = await getWorkouts();
    return workouts ? (
      <Navbar>
        <section className="profile wrapper container">
          <div className="profile-card">
            <h1 className="profile-title">Profile</h1>
            <Avatar />
          </div>
          <Statistics workouts={workouts} />
        </section>
      </Navbar>
    ) : null;
  } catch (err) {
    console.log(err);
  }
};

export default Profile;
