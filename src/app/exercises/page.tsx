import SearchBar from "./components/SearchBar";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://exercisedb.p.rapidapi.com/exercises/bodyPart/back",
  params: { limit: "10" },
  headers: {
    "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const Exercises = async () => {
  try {
    const { data } = await axios.request(options);
    return data ? <SearchBar data={data} /> : null;
  } catch (err) {
    console.log(err);
  }
};

export default Exercises;
