import { useContext, useLayoutEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { displayErrMsg } from "../../component/alerts/alerts";
import Footer from "../../component/navigation/footer";
import MinimalMobileHeader from "../../component/navigation/MinimalMobileHeader";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import GeneralContext from "../../context/general_context";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import AboutCourse from "./about_course";
import CourseInformation from "./course_information";
import CourseSection from "./course_section";

const CourseDetail = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  const { isLogged } = useContext(GeneralContext);
  const { courseid } = useParams();

  const getCourseDetail = async () => {
    setLoading(true);

    try {
      const res = await (
        await Services()
      ).get(global_variables().getCourses + `/${courseid}`);
      // console.log(res.data.data);
      setCourse(res.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      console.log(err.response?.data?.message);
      setLoading(true);
      displayErrMsg(err.response?.data?.message, () => {
        navigate(-1);
      });
    }
  };
  useLayoutEffect(() => {
    getCourseDetail();
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="flex justify-center items-center mt-5"
          style={{ marginBottom: "10vh" }}
        >
          <HashLoader
            color="#4080ff"
            loading={true}
            size={100}
            onClick={() => {
              setLoading(false);
            }}
          />
        </div>
      ) : (
        <>
        <NavigationBar />
          <div className=" font-serif">
            <MinimalMobileHeader title="The Art & Science of Drawing" />

            <div className="bg-white grid md:grid-cols-12 grid-cols-1 gap-0">
              <div
                className="col-span-9"
                style={{
                  backgroundImage: isLogged
                    ? "url(../img/paidcourse.png)"
                    : `url(../img/courseimage.png)`,
                  backgroundSize: "cover",
                }}
              >
                <div>
                  <AboutCourse
                    courseDetail={course}
                    // courseDetail={[]}
                    manageCart={""}
                  />
                </div>
              </div>
              <div className="col-span-3">
                {isLogged ? (
                  <CourseSection courseid={course.course_id} />
                ) : (
                  <>
                    <p className="text-center x-4 py-3 bg-white text-primary-600">
                      Please sign in to view course sections <br />
                      <Link to="/login" className="text-secondary-600">
                        sign in
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>

            <CourseInformation about={course.about} courseid={course.course_id} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CourseDetail;
