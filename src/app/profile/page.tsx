import { Avatar } from "@/components";
import Navbar from "@/components/navbar/Navbar";
import Statistics from "./components/WorkoutStatistics";
import { getWorkouts } from "@/actions";

const Profile = async () => {
  const workouts = await getWorkouts();
  return (
    <Navbar>
      <section className="profile wrapper container">
        <div className="profile-card">
          <h1 className="profile-title">Profile</h1>
          <Avatar />
        </div>
        <Statistics workouts={workouts} />
      </section>
    </Navbar>
  );
};

export default Profile;
