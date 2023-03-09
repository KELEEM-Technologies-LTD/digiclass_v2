import { Pagination } from "@mui/material";
import { useContext, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "../../component/cards/CourseCard";
import Footer from "../../component/navigation/footer";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import CourseSpinner from "../../component/spinners/course_spinner";
import GeneralContext from "../../context/general_context";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import InstructorName from "../mycourses/get_instructor_name";

const Instructor = () => {
  const { instructorid } = useParams();
  const { isLogged } = useContext(GeneralContext);
  const size = 8;
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [cpage, setCpage] = useState(1);

  const getCourses = async (p) => {
    if (instructorid) {
      try {
        const res = await (
          await Services()
        ).get(
          global_variables().getCourses +
            `?page=${p}&size=${size}&filter=instructor=${instructorid}&query_fields=id,title,language,status,airtime,short_description,price,category,instructor`
        );

        //   console.log(res.data?.data);
        setTotalPages(res.data?.data?.totalPages);
        setLoading(false);
        setCourses(res.data?.data?.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location.href = "/";
    }
  };

  useLayoutEffect(() => {
    getCourses(cpage);
  }, []);

  const handleChange = (event, value) => {
    // console.log(value);
    getCourses(value);
    setCpage(value);
  };
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col font-serif">
        <div className="flex flex-col bg-secondary-600 md:px-16 px-3 justify-end">
          <div className="items-center">
            <p className="text-2xl md:text-4xl md:font-bold text-white pt-7">
              Other courses by the same Instructor
            </p>
            {isLogged ? (
              <p className="text-md md:text-lg text-white mb-5">
                <InstructorName instructor={instructorid} />
              </p>
            ) : null}
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

export default Instructor;
