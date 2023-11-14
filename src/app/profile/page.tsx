import { Avatar } from "@/components";
import Statistics from "./components/WorkoutStatistics";
import { getWorkouts } from "@/actions";
import Navbar from "@/components/navbar/Navbar";

const Profile = async () => {
  try {
    const workouts = await getWorkouts();
    return (
      <Navbar>
        <section className="profile wrapper container pb-10">
          <div className="profile-card p-color">
            <h1 className="profile-title">Profile</h1>
            <Avatar />
          </div>
          {workouts ? <Statistics workouts={workouts} /> : null}
        </section>
      </Navbar>
    );
  } catch (err) {
    console.log("profile error ", err);
  }
};

export default Profile;
