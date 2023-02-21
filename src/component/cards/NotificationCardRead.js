import localforage from "localforage";
import moment from "moment";
import React, { useEffect, useState } from "react";

function NotificationCardRead({ data }) {
  const { heading, message, date, id } = data;
  const [viewed, setViewed] = useState(true);

  const checkViewed = async () => {
    const userData = await localforage.getItem("userdata");
    if (data.view.includes(userData.user_id)) {
      setViewed(false);
    } else {
      setViewed(true);
    }

    // console.log(data);
  };

  useEffect(() => {
    checkViewed();
  }, []);

  return (
    <div
      className={
        viewed
          ? `hidden`
          : null +
            ` flex justify-between item-center md:gap-1 gap-4 border-primary-300 border-b py-6 md:px-3`
      }
    >
      {/* <div>
        <button
          // onClick={() => id && handleDeleteNotification(id)}
          className="h-10 w-10 rounded-8 flex items-center justify-center bg-primary-400"
        >
          <img src="./img/cancel.svg" alt="x" />
        </button>
      </div> */}
      <div className="flex-col flex">
        <p className={`font-bold text-primary-900`}>{heading}</p>
        <p>{message}</p>
      </div>
      <div>
        <p>{moment(date).format("DD/mm/yyyy")}</p>
      </div>
    </div>
  );
}

export default NotificationCardRead;
