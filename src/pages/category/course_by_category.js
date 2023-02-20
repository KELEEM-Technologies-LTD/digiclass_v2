import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../component/navigation/footer";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import CourseSpinner from "../../component/spinners/course_spinner";
import CourseCard from "../../component/cards/CourseCard";

const CourseCategory = () => {
  const navigate = useNavigate();
  const { categoryid, name } = useParams();
  const size = 20;
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [cpage, setCpage] = useState(1);

  const getCourseInCategories = async (p) => {
    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses +
          `?page=${p}&size=${size}&filter=category=${categoryid}&query_fields=id,title,language,status,airtime,short_description,price`
      );

      //   console.log(res.data?.data);
      setTotalPages(res.data?.data?.totalPages);
      setLoading(false);
      setCourses(res.data?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseInCategories(cpage);
  }, []);

  const handleChange = (event, value) => {
    console.log(value);
    getCourseInCategories(value);
    setCpage(value);
  };

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col font-serif">
        <div className="flex flex-col bg-secondary-600 md:px-16 px-3 justify-end">
          <div className="flex justify-between items-center">
            <p className=" text-2xl md:text-4xl md:font-bold text-white py-7">
              {name}
            </p>
          </div>
        </div>
        <div className="mt-12 md:px-16 px-3">
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

export default CourseCategory;
