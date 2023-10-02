"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { createWorkout } from "@/actions";
import { CustomButton } from "@/components";
import LoadingModel from "@/components/models/LoadingModel";
import { HiOutlineTrash } from "react-icons/hi2";
import { WorkoutSession } from "@prisma/client";
import { createWorkoutSession } from "@/actions";

const CreateWorkoutForm = () => {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState<string[]>(["1"]);
  const [lbs, setLbs] = useState([0]);
  const [reps, setReps] = useState([0]);
  const [setOptions, setSetOptions] = useState(false);
  const [setIndex, setSetIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = data.getAll("lbs")?.valueOf();
    const dataReps = data.getAll("reps")?.valueOf();

    if (!dataLbs || !dataReps) {
      alert("Exercise, lbs, sets, and reps are required");
      return;
    }

    Object.values(dataLbs).map((lb) => {
      lbs.push(Number(lb));
      lbs.shift();
    });
    Object.values(dataReps).map((rep) => {
      reps.push(Number(rep));
      reps.shift();
    });

    setLbs([...lbs]);
    setReps([...reps]);

    try {
      await createWorkout(exercise, sets, lbs, reps);
      router.push("/workouts");
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    const lastSet = sets[sets.length - 1];
    if (!!Number(lastSet)) {
      const set = Number(lastSet) + 1;
      // sets?.push(String(set));
      setSets([...sets, String(set)]);
    } else {
      // sets?.push("1");
      setSets([...sets, "1"]);
    }

    setLbs([...lbs, 0]);
    setReps([...reps, 0]);
    router.refresh();
  };

  const changeSet = async (e: MouseEvent) => {
    const { target } = e;
    if (target) {
      const set = (target as HTMLButtonElement).value;
      sets.splice(setIndex, 1, set);
      const newSet: string[] = [];
      let i = 1;
      sets.map((set) => {
        if (!!Number(set)) {
          newSet.push(String(i));
          i++;
        } else {
          newSet.push(set);
        }
      });
    }
  };

  const handleDeleteSet = async (setId: number) => {
    sets.splice(setId, 1);
    lbs.splice(setId, 1);
    reps.splice(setId, 1);
    if (!sets.length) {
      sets.push("1");
      setSets([...sets]);
      lbs.push(0);
      setLbs([...lbs]);
      reps.push(0);
      setReps([...reps]);
    }
    router.refresh();
  };

  const removeWorkout = async () => {
    router.push("/workouts");
  };

  return (
    <>
      {isLoading && <LoadingModel />}
      <div className="wrapper container">
        <form action={handleSubmit} className="flex flex-col m-4">
          <div className="grid grid-cols-3 m-5">
            <label htmlFor="exercise" className="cols-span-1 text-center">
              Exercise:{" "}
            </label>
            <input
              onChange={(e) => setExercise(e.target.value)}
              type="text"
              name="exercise"
              id="exercise"
              className="bg-white border rounded-lg col-start-2 col-span-2 mr-5"
            />
          </div>

          <div
            onMouseLeave={() => setSetOptions(!setOptions)}
            className={
              setOptions
                ? "absolute bg-gray-800 text-white ml-20 px-2 rounded-lg"
                : "hidden"
            }
          >
            <option
              value="w"
              onClick={(e) => {
                changeSet(e);
                setSetOptions(!setOptions);
              }}
            >
              Warm-up
            </option>
            <option
              value="d"
              onClick={(e) => {
                changeSet(e);
                setSetOptions(!setOptions);
              }}
            >
              Drop Set
            </option>
            <option
              value="f"
              onClick={(e) => {
                changeSet(e);
                setSetOptions(!setOptions);
              }}
            >
              Failure
            </option>
          </div>
          {sets?.map((set, setId) => (
            <div key={setId} className="grid grid-cols-3 gap-4" id="sets-list">
              <div className="col-span-1">
                <div className="flex justify-around">
                  <button type="button" onClick={() => handleDeleteSet(setId)}>
                    <HiOutlineTrash />
                  </button>
                  <div>
                    <span>Set</span>
                    <CustomButton
                      title={set}
                      containerStyles="workout-form__input"
                      handleClick={() => {
                        setSetOptions(!setOptions);
                        setSetIndex(setId);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 justify-self-center">
                <label htmlFor="lbs">Weight: </label>
                <input
                  type="number"
                  name="lbs"
                  id="lbs"
                  placeholder="0"
                  className="workout-form__input"
                  required
                />
              </div>
              <div className="col-span-1 justify-self-center">
                <label htmlFor="reps">Reps: </label>
                <input
                  type="number"
                  name="reps"
                  id="reps"
                  placeholder="0"
                  className="workout-form__input"
                  required
                />
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-2 my-2">
            <CustomButton
              title="Add Set"
              containerStyles="bg-gray-600 text-white rounded-lg"
              handleClick={addSet}
            />
            <button type="submit" className="bg-blue-800 text-white rounded-lg">
              Create Workout
            </button>
            <CustomButton
              title="Cancel Workout"
              containerStyles="bg-red-300 text-white rounded-lg"
              handleClick={removeWorkout}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateWorkoutForm;
