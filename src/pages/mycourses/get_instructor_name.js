import { useLayoutEffect, useState } from "react";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";

const InstructorName = ({ instructor }) => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const instructor_res = await (
        await Services()
      ).get(global_variables().getUser + `/${instructor}`);
      //   console.log(instructor_res.data?.data?.first_name);
      setName(
        instructor_res.data?.data?.first_name +
          " " +
          instructor_res.data?.data?.last_name
      );
    } catch (err) {}
  };

  useLayoutEffect(() => {
    getName();
  }, []);

  return <>{name}</>;
};

export default InstructorName;
