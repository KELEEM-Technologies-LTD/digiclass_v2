import { useEffect, useState } from "react";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

const CourseNameById = ({ id }) => {
  const [name, setName] = useState();

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    try {
      const res = await (
        await Services()
      ).get(global_variables().getCourses + `/${id}`);

      //   console.log(res.data?.data?.title);
      setName(res.data?.data?.title);
    } catch (error) {
      setName("unknown");
    }
  };

  return <>{name}</>;
};

export default CourseNameById;
