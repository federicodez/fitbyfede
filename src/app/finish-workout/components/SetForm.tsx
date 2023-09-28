import { useState, MouseEvent } from "react";
import { CustomButton } from "@/components";
import { HiOutlineTrash } from "react-icons/hi2";

type SetFormProps = {
  id: string;
  sets: string[];
  changeSet: (id: string, e: MouseEvent) => void;
  handleDeleteSet: (id: string, setId: number) => void;
};

const SetForm = ({ id, sets, changeSet, handleDeleteSet }: SetFormProps) => {
  const [setOptions, setSetOptions] = useState(false);
  const [setIndex, setSetIndex] = useState<number>(0);

  return (
    <ul className="workout-form__list" id="sets-list">
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
            changeSet(id, e);
            setSetOptions(!setOptions);
          }}
        >
          Warm-up
        </option>
        <option
          value="d"
          onClick={(e) => {
            changeSet(id, e);
            setSetOptions(!setOptions);
          }}
        >
          Drop Set
        </option>
        <option
          value="f"
          onClick={(e) => {
            changeSet(id, e);
            setSetOptions(!setOptions);
          }}
        >
          Failure
        </option>
      </div>
      {sets?.map((set, setId) => (
        <li key={setId} className="workout-form__item">
          <button type="button" onClick={() => handleDeleteSet(id, setId)}>
            <HiOutlineTrash />
          </button>
          <div className="workout-form__label-input">
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
        </li>
      ))}
    </ul>
  );
};

export default SetForm;
