import { useEffect, useState } from "react";
import { SearchIcon } from "../../../assets";
import InputWithIcon from "../../../component/InputFields/InputWithIcon";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

const SearchHomeBanner = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getItems = async (input) => {
    try {
      const res = await (
        await Services()
      ).get(global_variables().getCourses + `?filter=title=${input}`);
      setSuggestions(res.data?.data?.data);
      // console.log(res.data?.data?.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    getItems(inputValue);
  }, [inputValue]);

  return (
    <>
      <div className="relative text-primary-600 flex-grow">
        <InputWithIcon
          placeholder={"What do you want to learn?"}
          className="md:w-11/12  w-full mt-6 flex h-14  bg-primary-100  justify-between"
          icon="fa fa-search text-2xl text-secondary-500"
          id="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <ul
          className={`absolute md:w-11/12  w-full z-10 w-full py-2 mt-0 bg-white rounded-md shadow-lg ${
            suggestions.length === 0 ? "hidden" : ""
          }`}
          style={{ zIndex: "100" }}
        >
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-primary-200 cursor-pointer text-black"
              onClick={() =>
                (window.location.href = `/course/${item.course_id}`)
              }
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchHomeBanner;
