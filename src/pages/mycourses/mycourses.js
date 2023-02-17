import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Footer from "./../../component/navigation/footer";
import NavigationBar from "./../../component/navigation/public_navigation_bar";

const MyCourses = () => {
  const [filter, setFilter] = useState("title");
  const [category, setCategory] = useState("ICT");

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col font-serif">
        <div className="flex flex-col bg-secondary-600 md:px-16 px-3 justify-end">
          <div className="flex justify-between items-center">
            <p className=" text-2xl md:text-4xl md:font-bold text-white py-16">
              My Courses
            </p>
          </div>
        </div>

        {/* main content */}
        <div className="mt-12 md:px-16 px-3">
          <p>Sorty by</p>
          <div className="flex justify-between mt-5">
            <div className="flex gap-5">
              <div className="w-50">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="filter"
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="language">Language</MenuItem>
                    <MenuItem value="short_description">
                      Short description
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="w-50">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="category"
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value="ICT">ICT</MenuItem>
                    <MenuItem value="baking">Baking</MenuItem>
                    <MenuItem value="exercise">Exercise</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyCourses;
