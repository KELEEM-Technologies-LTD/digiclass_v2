import { useEffect } from "react";
import { useState } from "react";
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
      <div className="relative">
        <InputWithIcon
          placeholder="What do you want to learn?"
          className="flex py-2 rounded-5 bg-primary-100 justify-between text-black"
          icon="fa fa-search text-sm text-secondary-500"
          disabled={false}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <ul
          className="absolute z-10 w-full py-2 mt-1 bg-white rounded-md shadow-lg"
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
