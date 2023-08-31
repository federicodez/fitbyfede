"use client";
import { useState, Fragment } from "react";
import { SearchExerciseProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import { exercises } from "@/constants/intex";

export default function SearchExercises({
  exercise,
  setExercise,
}: SearchExerciseProps) {
  const [query, setQuery] = useState("");

  const filteredExercises =
    query === ""
      ? exercises
      : exercises.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="select-exercise-form">
      <Combobox value={exercise} onChange={setExercise}>
        <Combobox.Input
          onChange={(e) => setQuery(e.target.value)}
          className="select-input"
          placeholder="Search"
          displayValue={(exercise: string) => exercise}
        />
        <Transition
          as={Fragment}
          leave="transiton ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options>
            {filteredExercises.map((item) => (
              <Combobox.Option
                key={item}
                className={({ active }) =>
                  `relative search-exercises ${
                    active ? "bg-primary-blue text-white" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-teal-600"
                        }`}
                      ></span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
}
