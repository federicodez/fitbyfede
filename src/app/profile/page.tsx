import { getWorkouts } from "@/actions/workouts";
import Navbar from "@/components/navbar/Navbar";
import { PieChart, Settings } from "./components";
import { Avatar } from "@/components";
import { Suspense } from "react";
import LoadingModel from "@/components/models/LoadingModel";

const Profile = async () => {
  try {
    const workouts = await getWorkouts();
    return (
      <Navbar>
        <section className="wrapper pb-20 sm:pb-5">
          <div className="rounded-lg my-5 p-4 border p-color">
            <Suspense fallback={<LoadingModel />}>
              <Settings />
            </Suspense>
            <Suspense fallback={<LoadingModel />}>
              <Avatar />
            </Suspense>
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
