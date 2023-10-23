import { Avatar } from "@/components";
import Statistics from "./components/WorkoutStatistics";
import { getWorkouts } from "@/actions";
import Navbar from "@/components/navbar/Navbar";

const Profile = async () => {
  try {
    const workouts = await getWorkouts();
    return (
      <Navbar>
        <section className="profile wrapper container">
          <div className="profile-card">
            <h1 className="profile-title">Profile</h1>
            <Avatar />
          </div>
          {workouts ? <Statistics workouts={workouts} /> : null}
        </section>
      </Navbar>
    );
  } catch (err) {
    console.log(err);
  }
};

export default Profile;
