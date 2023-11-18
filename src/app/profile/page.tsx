import dynamic from "next/dynamic";
import { getWorkouts } from "@/actions/workouts";
import Navbar from "@/components/navbar/Navbar";
import Settings from "./components/Settings";
const Avatar = dynamic(() => import("@/components/Avatar"), {
  loading: () => <p className="animate-bounce">Loading...</p>,
});
const PieChart = dynamic(() => import("./components/PieChart"), {
  loading: () => <p className="animate-bounce">Loading...</p>,
});

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
