import { Skeleton } from "@mui/material";
import localforage from "localforage";
import { useContext, useEffect, useState } from "react";
import NotificationCard from "../../../component/cards/NotificationCard";
import NotificationCardRead from "../../../component/cards/NotificationCardRead";
import GeneralContext from "../../../context/general_context";

const Notifications = () => {
  const { notifLoading, notifications, user } = useContext(GeneralContext);

  const [viewed, setViewed] = useState([]);
  const [notViewed, setNotViewed] = useState([]);

  useEffect(() => {
    const seenArr = notifications.filter((obj) =>
      obj.view.includes(user.user_id)
    );

    const notSeenArr = notifications.filter(
      (obj) => !obj.view.includes(user.user_id)
    );

    setViewed(seenArr);
    setNotViewed(notSeenArr);
  }, [notifications]);

  return (
    <>
      <div className="flex flex-col md:px-12 px-4">
        <p className="my-2 font-bold text-lg text-black">
          Recent Notifications
        </p>
        {notifLoading ? (
          <>
            <Skeleton height={80} />
            <Skeleton height={80} />
          </>
        ) : (
          notViewed.map((data, index) => {
            return <NotificationCard key={index} data={data} />;
          })
        )}

        <p className="my-2 font-bold text-lg mt-7">Read Notifications</p>
        {notifLoading ? (
          <>
            <Skeleton height={80} />
            <Skeleton height={80} />
          </>
        ) : (
          viewed.map((data, index) => {
            return <NotificationCardRead key={index} data={data} />;
          })
        )}
        {/* < /> */}
      </div>
    </>
  );
};

export default Notifications;
