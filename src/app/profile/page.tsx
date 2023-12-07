import { getWorkouts } from "@/actions/workouts";
import Navbar from "@/components/navbar/Navbar";
import { PieChart, LineChart } from "./components";
import { Avatar } from "@/components";
import { Measurements } from "./components";
import { getMeasurements } from "@/actions/measurements";

const Profile = async () => {
  try {
    const workouts = await getWorkouts();
    const measurements = (await getMeasurements()) || [];
    return (
      <Navbar>
        <section className="wrapper pb-20 sm:pb-5">
          <div className="rounded-md my-5 p-4 border-[#8ebbff] border bg-[#24293e]">
            <Avatar />
          </div>
          <Measurements measurements={measurements} />
          {workouts ? (
            <>
              <PieChart workouts={workouts} />
              <LineChart workouts={workouts} />
            </>
          ) : null}
        </section>
      </Navbar>
    );
  } catch (err) {
    console.log("profile error ", err);
  }
};

export default Profile;
