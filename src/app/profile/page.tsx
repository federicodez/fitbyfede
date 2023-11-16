import { Avatar } from "@/components";
import Statistics from "./components/WorkoutStatistics";
import { getWorkouts, getSessions } from "@/actions";
import Navbar from "@/components/navbar/Navbar";
import Settings from "./components/Settings";
import PieChart from "./components/PieChart";

const Profile = async () => {
  try {
    const workouts = await getWorkouts();
    return (
      <Navbar>
        <section className="wrapper pb-20 sm:pb-5">
          <div className="rounded-lg my-5 p-4 border p-color">
            <Settings />
            <h1 className="text-center font-bold">Profile</h1>
            <Avatar />
          </div>
          {workouts && <PieChart workouts={workouts} />}
        </section>
      </Navbar>
    );
  } catch (err) {
    console.log("profile error ", err);
  }
};

export default Profile;
