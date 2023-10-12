"use client";

import { useState, MouseEvent } from "react";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { exercises } from "@/constants";
import { createExercise, createWorkoutSession, createMany } from "@/actions";
import { useRouter } from "next/navigation";
import LoadingModel from "@/components/models/LoadingModel";
import Image from "next/image";

type Data = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}[];

type SearchBarProps = {
  data: Data;
};

const SearchBar = ({ data }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseQueue, setExerciseQueue] = useState<string[]>([]);
  const [details, setDetails] = useState<string | boolean>(false);

  const router = useRouter();

  const handleClick = async () => {
    try {
      const session = await createWorkoutSession();

      if (session) {
        await createMany(exerciseQueue, session);
        setIsLoading(true);
        router.push(`/finish-workout/${session.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToExercises = async (exercise: string) => {
    if (!exerciseQueue.includes(exercise)) {
      exerciseQueue.push(exercise);
    } else {
      const index = exerciseQueue.indexOf(exercise);
      exerciseQueue.splice(index, 1);
    }
    setExerciseQueue([...exerciseQueue]);
  };

  const filteredExercises =
    query === ""
      ? exercises
      : exercises.filter((item) =>
          item[0]
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <>
      {isLoading && <LoadingModel />}
      <div className="searchbar wrapper container">
        <div className="flex flex-row justify-between mt-8">
          <button type="button" className="text-[#03045e]" id="create-btn">
            <Link href="/create-workout">New</Link>
          </button>
        </div>
        <form className="searchbar-form">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="query"
            placeholder="Search"
            className="searchbar-form__input"
          />
        </form>
        <ul className="container wrapper">
          {data.map(
            ({
              bodyPart,
              equipment,
              gifUrl,
              id,
              name,
              target,
              secondaryMuscles,
              instructions,
            }) => (
              <>
                <li
                  key={id}
                  className={
                    !details
                      ? `flex justify-evenly items-center gap-5 m-5 rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
                      : "hidden"
                  }
                  onClick={() => setDetails(id)}
                >
                  <Image
                    id="gif"
                    src={gifUrl}
                    height={100}
                    width={100}
                    alt="exercise gif"
                  />
                  <div className="flex flex-col">
                    <strong id="name">{name}</strong>
                    <div className="" id="bodypart">
                      {bodyPart}
                    </div>
                  </div>
                </li>
                <li
                  key={id}
                  className={
                    details === id
                      ? `flex flex-col px-5 rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
                      : "hidden"
                  }
                  onClick={() => setDetails(false)}
                >
                  <strong className="text-center" id="name">
                    {name}
                  </strong>
                  <Image
                    className="flex self-center"
                    id="gif"
                    src={gifUrl}
                    height={400}
                    width={400}
                    alt="exercise gif"
                  />
                  <h3 className="text-center underline">Instructions</h3>
                  {instructions.map((item, Id) => (
                    <li
                      className="list-disc list-inside"
                      key={Id}
                      id="intructions"
                    >
                      {item}
                    </li>
                  ))}
                  <h3 className="text-center underline">Body Part</h3>
                  <div className="text-center" id="bodypart">
                    {bodyPart}
                  </div>
                  <h3 className="text-center underline">Equipment</h3>
                  <div className="text-center" id="equipment">
                    {equipment}
                  </div>
                  <h3 className="text-center underline">Target</h3>
                  <div className="text-center" id="target">
                    {target}
                  </div>
                  <h3 className="text-center underline">Secondary Mucles</h3>
                  {secondaryMuscles.map((muscle, Id) => (
                    <li
                      className="list-disc list-inside"
                      key={Id}
                      id="secondary-muscle"
                    >
                      {muscle}
                    </li>
                  ))}
                </li>
              </>
            ),
          )}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
