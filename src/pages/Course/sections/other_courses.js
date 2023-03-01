import { useEffect, useState } from "react";
import { displayErrMsg } from "../../../component/alerts/alerts";
import CourseCard from "../../../component/cards/CourseCard";
import CourseSpinner from "../../../component/spinners/course_spinner";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

const OtherCourseByAuthor = ({ author_id }) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // console.log(author_id);
    getCourses();
  }, []);

  const getCourses = async () => {
    setLoading(true);
    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses +
          `?size=4&filter=instructor=${author_id}&query_fields=id,title,language,status,airtime,short_description,price`
      );
      console.log(res.data.data.data);
      setCourses(res.data?.data?.data);
      setLoading(false);
    } catch (err) {
      displayErrMsg("Error loading data, please reload page");
    }
  };

  return (
    <div className="px-10 mb-5">
      <h3 className="text-2xl font-bold text-black mb-0  mt-12">
        Other courses by the same Instructor
      </h3>
      <hr className="mb-2 mr-40 py-5" />
      <div className="grid md:grid-cols-4 grid-cols-1 md:gap-2 gap-1">
        {loading
          ? ["", "", "", ""].map((d, index) => {
              return <CourseSpinner key={index} />;
            })
          : courses.map((item, index) => {
              return <CourseCard item={item} key={index} />;
            })}
      </div>
    </div>
  );
};

export default OtherCourseByAuthor;
