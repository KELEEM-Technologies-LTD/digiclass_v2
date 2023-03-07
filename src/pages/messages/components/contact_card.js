import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

const ContactCard = ({
  reciever,
  setChatToShow,
  chatToShow,
  toggleDrawer,
  sender,
  active,
  setActive,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  const getUser = async () => {
    setLoading(true);
    try {
      const instructor_res = await (
        await Services()
      ).get(global_variables().getMsgName + `/${reciever}`);
      setUser(instructor_res.data?.payload[0]);
      //   console.log(instructor_res.data?.payload);
      setLoading(false);
    } catch (error) {
      //   console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getUser();
    // console.log(sender);
    // console.log(reciever);
    // console.log(user);
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div
          className={`flex px-4 py-2 text-[black] hover:bg-primary-200 cursor-pointer ${
            active === reciever ? "bg-primary-300" : null
          }`}
          onClick={() => {
            setChatToShow(reciever);
            setActive(reciever);
            toggleDrawer();
          }}
        >
          <Avatar>
            {user?.first_name[0]}
            {user?.last_name[0]}
          </Avatar>
          <div className="ml-3 mt-2">{user?.first_name}</div>
        </div>
      )}
    </>
  );
};

export default ContactCard;
