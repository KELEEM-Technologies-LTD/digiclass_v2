import { useEffect } from "react";
import { useState } from "react";
import { SearchIcon } from "../../assets";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import InputWithIcon from "../InputFields/InputWithIcon";

const NavBarSeacrhField = () => {
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
      {/* <div className="relative"> */}
      <div
        className="relative text-primary-600 flex-grow"
        style={{ width: "220px" }}
      >
        <input
          className="w-full px-5 py-2 rounded-full border-2 border-primary-300 focus:outline-none focus:border-blue-500"
          type="search"
          name="search"
          placeholder="What do you want to learn?"
          disabled={false}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        {inputValue ? (
          <></>
        ) : (
          <button type="submit" className="absolute top-0 right-0 mt-3 mr-4">
            <SearchIcon />
          </button>
        )}
        <ul
          className="absolute z-10 w-full py-2 mt-0 bg-white rounded-md shadow-lg"
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

export default NavBarSeacrhField;
