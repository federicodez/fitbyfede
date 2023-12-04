import { getWorkouts } from "@/actions/workouts";
import Navbar from "@/components/navbar/Navbar";
import { PieChart } from "./components";
import { Avatar } from "@/components";
import { Suspense } from "react";
import LoadingModal from "@/components/modals/LoadingModal";

const Profile = async () => {
  try {
    const workouts = await getWorkouts();
    return (
      <Navbar>
        <section className="wrapper pb-20 sm:pb-5">
          <div className="rounded-md my-5 p-4 border-[#8ebbff] border p-color">
            <Suspense fallback={<LoadingModal />}>
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
