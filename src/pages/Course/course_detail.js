import { Tab } from "@headlessui/react";
import localforage from "localforage";
import { useContext, useLayoutEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { displayErrMsg } from "../../component/alerts/alerts";
import logout_and_redirect from "../../component/hoc/logout-redirect";
import Footer from "../../component/navigation/footer";
import MinimalMobileHeader from "../../component/navigation/MinimalMobileHeader";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import GeneralContext from "../../context/general_context";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import AboutCourse from "./sections/about_course_banner";
import AboutAuthor from "./sections/about_the_author";
import CourseInformation from "./sections/course_information";
import CourseSection from "./sections/course_section";
import OtherCourseByAuthor from "./sections/other_courses";
import Reviews from "./sections/reviews";

const CourseDetail = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [review, setReviews] = useState([]);
  const [reviewLoading, setreviewLoading] = useState(true);
  const navigate = useNavigate();

  const { isLogged } = useContext(GeneralContext);
  const { courseid } = useParams();

  const getCourseDetail = async () => {
    setLoading(true);

    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses +
          `/${courseid}?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail`
      );
      // console.log(res.data.data);
      setCourse(res.data?.data);

      const token = await localforage.getItem("token");

      if (token !== null) {
        try {
          const instructor_res = await (
            await Services()
          ).get(global_variables().getUser + `/${res?.data?.data?.instructor}`);
          // console.log(instructor_res.data?.data);
          setInstructor(instructor_res.data?.data);
          setLoading(false);
        } catch (error) {
          if (error.response?.status === 401) {
            logout_and_redirect();
          } else {
            displayErrMsg(error.response?.data?.message, () => {
              navigate(-1);
            });
          }
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      // console.log(err);
      // console.log(err.response?.data?.message);
      setLoading(true);
      displayErrMsg(err.response?.data?.message, () => {
        navigate(-1);
      });
    }
  };

  const getReviews = async () => {
    const token = await localforage.getItem("token");
    setreviewLoading(true);
    if (token !== null) {
      try {
        const reviewres = await (
          await Services()
        ).get(global_variables().getReviews + `?course_id=${courseid}`);

        setReviews(reviewres.data?.data?.data);
        setreviewLoading(false);
      } catch (er) {
        setreviewLoading(false);
      }
    }
  };

  const checkCourse = async () => {
    const user = await localforage.getItem("userdata");
    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses + `/${courseid}/users/${user.user_id}`
        // `/users/9c5a1da9f779441d84f06168ccf0574b`
      );

      // console.log(res.data?.data);
      window.location.href = `/my-course/${courseid}`;
      // setVideos(res.data?.data?.videos[keys[0]]);

      // console.log(keys);
      // console.log(res.data?.data?.videos[keys[0]]);
    } catch (error) {
      // console.log(error.response?.data?.message);
    }
  };

  useLayoutEffect(() => {
    checkCourse();
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
          <div className="font-serif">
            <MinimalMobileHeader title={course.title} />

            <div className="bg-white grid md:grid-cols-12 grid-cols-1 gap-0">
              <div
                className="col-span-9"
                style={{
                  backgroundImage: `url(${course.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <AboutCourse
                  course_detail={course}
                  instructor={instructor}
                  loading={reviewLoading}
                  reviews={review}
                />
              </div>
              <div
                className="col-span-3"
                style={{ maxHeight: "70vh", overflowY: "hidden" }}
              >
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

            {isLogged ? (
              <Tab.Group>
                <Tab.List className="flex overflow-x-scroll">
                  <Tab className="px-6 py-3 flex justify-center items-center cursor-pointer md:border-b-0 border-b border-primary-300 ">
                    Overview
                  </Tab>
                  <Tab className="px-6 py-3 flex justify-center items-center cursor-pointer md:border-b-0 border-b border-primary-300">
                    Reviews
                  </Tab>
                  <Tab className="px-6 py-3 flex justify-center items-center cursor-pointer md:border-b-0 border-b border-primary-300">
                    Author
                  </Tab>
                  <Tab className="px-6 py-3 flex justify-center items-center cursor-pointer md:border-b-0 border-b border-primary-300">
                    FAQ
                  </Tab>
                </Tab.List>
                <div className="grid md:grid-cols-12 grid-cols-1">
                  <div className="col-span-9">
                    <div className="md:px-24 px-4 py-4">
                      <Tab.Panels>
                        <Tab.Panel>
                          <CourseInformation course={course} />
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="py-3 item-center flex flex-col justify-center">
                            <p className="text-secondary-600 font-bold text-lg">
                              Reviews
                            </p>
                            <Reviews
                              loading={reviewLoading}
                              reviews={review}
                              courseid={course.course_id}
                              reload={getReviews}
                              allow={false}
                            />
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <AboutAuthor
                            instructor={instructor}
                            course_detail={course}
                          />
                        </Tab.Panel>
                      </Tab.Panels>
                    </div>
                  </div>
                </div>
              </Tab.Group>
            ) : (
              <div className="grid md:grid-cols-12 grid-cols-1">
                <div className="col-span-9">
                  <div className="md:px-24 px-4 py-4">
                    <CourseInformation course={course} />
                  </div>
                </div>
              </div>
            )}
            {/* other courses by the same author */}
            <OtherCourseByAuthor author_id={course.instructor} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CourseDetail;
