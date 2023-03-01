import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import logout_and_redirect from "../../../component/hoc/logout-redirect";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";
import SectionItem from "./section_item";

const CourseSection = ({ courseid, lock }) => {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);

  //   console.log(isLogged);

  const getSections = async () => {
    setLoading(true);
    try {
      const res = await (
        await Services()
      ).get(global_variables().getSections + `?course_id=${courseid}`);
      // console.log(res.data?.data?.data);
      setSections(res.data?.data?.data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        logout_and_redirect();
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getSections();
  }, []);

  return (
    <>
      <div className="px-4 py-3 bg-white">
        <p className="text-secondary-600 text-lg">Course content</p>
      </div>
      <hr className="my-1 mx-5 border-t border-secondary-400" />
      <div className="w-full px-4 pt-2">
        <div className="mx-auto w-full max-w-md rounded-2xl  p-0">
          {loading ? (
            <>
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
            </>
          ) : sections.length === 0 ? (
            <p className="text-center x-4 py-3 bg-white text-primary-600">
              This course is not divided into several sub sections
            </p>
          ) : (
            sections.map((data, index) => {
              return (
                <div
                  className="px-4 pt-4 pb-2 text-sm text-secondary-500"
                  key={index}
                >
                  <SectionItem
                    item={{
                      title: data.name,
                      duration: data.position + ":00",
                      lock: lock,
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default CourseSection;
