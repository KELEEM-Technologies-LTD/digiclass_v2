import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import GeneralContext from "../../context/general_context";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import SectionItem from "./section_item";

const CourseSection = ({ courseid }) => {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);

  const { isLogged } = useContext(GeneralContext);

  //   console.log(isLogged);

  const getSections = async () => {
    setLoading(true);
    try {
      const res = await (
        await Services()
      ).get(global_variables().getSections + `?course_id=${courseid}`);
    //   console.log(res.data?.data?.data);
      setSections(res.data?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
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
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 text-black">
                    <div>
                      <p className="text-primary-800 font-bold text-lg">
                        {" "}
                        Section 1: Introduction
                      </p>
                      <p className="mt-1 text-sm">0/5 | 47min</p>
                    </div>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-primary-500">
                    <SectionItem
                      item={{
                        title: "Indroduction",
                        duration: "7:36",
                      }}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseSection;
