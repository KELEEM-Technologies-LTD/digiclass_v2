import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { displayErrMsg } from "../../component/alerts/alerts";
import CourseCard from "../../component/cards/CourseCard";
import Footer from "../../component/navigation/footer";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import CourseSpinner from "../../component/spinners/course_spinner";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";

const AllCourses = () => {
  const size = 20;
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("title");
  const [cpage, setCpage] = useState(1);

  const get_courses = async (s, p) => {
    setLoading(true);

    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses +
          `?page=${p}&size=${s}&query_fields=id,title,language,status,airtime,short_description,price`
      );

      // console.log(res.data?.data);
      setTotalPages(res.data?.data?.totalPages);
      setLoading(false);
      setCourses(res.data?.data?.data);
      //   log(res.data?.data)
    } catch (err) {
      displayErrMsg("Error loading courses, please reload page", () => {});
    }
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleChange = (event, value) => {
    // console.log(value);
    get_courses(size, value);
    setCpage(value);
  };

  useEffect(() => {
    get_courses(size, cpage);
  }, []);

  const handleSearch = async (e) => {
    if (e.target.value.length > 3) {
      setLoading(true);
      const query = e.target.value;
      // console.log(query);

      try {
        const res = await (
          await Services()
        ).get(
          global_variables().getCourses +
            `?page=1&size=${size}&filter=${filter}=${query}&query_fields=id,title,language,status,airtime,short_description,price`
        );

        setTotalPages(res.data?.data?.totalPages);
        setLoading(false);
        setCourses(res.data?.data?.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />

      <div className="flex flex-col font-serif">
        {/* Header  */}
        <div className="flex flex-col bg-secondary-600 md:px-16 px-3 justify-end">
          <div className="flex justify-between items-center">
            <p className=" text-2xl md:text-4xl md:font-bold text-white py-7">
              All Courses
            </p>
          </div>
        </div>
        {/* Header */}

        <div className="mt-12 md:px-16 px-3">
          <p>Sort by</p>
          {/* Filter */}
          <div className="flex justify-between mt-5">
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
            <div className="">
              <FormControl>
                <InputLabel htmlFor="my-input">Search</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  onChange={handleSearch}
                />
                <FormHelperText id="my-helper-text">
                  Search course by name
                </FormHelperText>
              </FormControl>
            </div>
          </div>

          {/*Data*/}
          {loading ? (
            <div className="grid md:grid-cols-4 md:gap-2 gap-1 grid-cols-1 mt-6">
              <CourseSpinner />
              <CourseSpinner />
              <CourseSpinner />
              <CourseSpinner />
            </div>
          ) : (
            <div className="grid md:grid-cols-4 md:gap-2 gap-1 grid-cols-1 mt-6">
              {courses.length === 0 ? (
                <p className="text-center">No courses found</p>
              ) : (
                courses.map((d, index) => {
                  return <CourseCard item={d} key={index} />;
                })
              )}
            </div>
          )}
          <div className="flex justify-center mt-12 mr-5">
            {courses.length !== 0 && (
              <Pagination
                count={totalPages}
                color="primary"
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AllCourses;
