import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

const ContactCardNew = ({ onClick, sender, reciever }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  // console.log(reciever);
  const getUser = async () => {
    setLoading(true);
    try {
      const instructor_res = await (
        await Services()
      ).get(global_variables().getMsgName + `/${reciever}`);
      setUser(instructor_res.data?.payload[0]);
      // console.log(instructor_res.data?.payload);
      setLoading(false);
    } catch (error) {
      //   console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return loading ? (
    <></>
  ) : (
    <button
      onClick={onClick}
      className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-primary-800 gap-x-2 hover:bg-primary-100 focus:outline-none"
    >
      {user?.profile_pic ? (
        <Avatar src={user?.profile_pic} alt="" />
      ) : (
        <Avatar />
      )}
      <div className="text-left rtl:text-right">
        <h1 className="text-sm font-medium text-primary-700 capitalize dark:text-white">
          {user?.first_name + " " + user?.last_name}
        </h1>
        <p className="text-xs text-primary-500 dark:text-primary-400">
          Student
        </p>
      </div>
    </button>
  );
};

export default ContactCardNew;
