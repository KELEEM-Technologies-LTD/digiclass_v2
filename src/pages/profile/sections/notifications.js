import { Skeleton } from "@mui/material";
import localforage from "localforage";
import { useEffect, useState } from "react";
import {
  displayErrMsg,
  displaySuccMsg,
} from "../../../component/alerts/alerts";
import NotificationCard from "../../../component/cards/NotificationCard";
import NotificationCardRead from "../../../component/cards/NotificationCardRead";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifs, setNotifs] = useState([]);

  const getNotifications = async () => {
    // setLoading(true);
    // console.log("triggered");

    const userdata = await localforage.getItem("userdata");
    try {
      const res = await (
        await Services()
      ).get(global_variables().getNotifications + `/${userdata.user_id}`);

      // console.log(res.data?.payload);
      setNotifs(res.data?.payload);
      setLoading(false);
    } catch (err) {
      // console.log(err);
      displayErrMsg("Notifications not found", () => {});
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <div className="flex flex-col md:px-12 px-4">
        <p className="my-2 font-bold text-lg text-black">
          Recent Notifications
        </p>
        {loading ? (
          <>
            <Skeleton height={80} />
            <Skeleton height={80} />
          </>
        ) : (
          notifs.map((data, index) => {
            return (
              <NotificationCard
                key={index}
                data={data}
                getNotifications={getNotifications}
              />
            );
          })
        )}

        <p className="my-2 font-bold text-lg mt-7">Read Notifications</p>
        {loading ? (
          <>
            <Skeleton height={80} />
            <Skeleton height={80} />
          </>
        ) : (
          notifs.map((data, index) => {
            return <NotificationCardRead key={index} data={data} />;
          })
        )}
        {/* < /> */}
      </div>
    </>
  );
};

export default Notifications;
