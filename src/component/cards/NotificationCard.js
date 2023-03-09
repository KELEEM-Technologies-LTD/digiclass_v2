import { CircularProgress } from "@mui/material";
import localforage from "localforage";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import GeneralContext from "../../context/general_context";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import { displayErrMsg, displaySuccMsg } from "../alerts/alerts";

function NotificationCard({ data }) {
  const { getNotifications } = useContext(GeneralContext);
  const [seen, setSeen] = useState(false);

  const { heading, message, date, id } = data;

  const triggerSeen = async () => {
    setSeen(true);
    const userData = await localforage.getItem("userdata");
    try {
      const res = await (
        await Services()
      ).put(global_variables().updateSeen, {
        notif_id: id,
        user_id: userData.user_id,
      });

      displaySuccMsg(res.data?.message, () => {});
      getNotifications();
    } catch (error) {
      displayErrMsg("Error updating notification status", () => {});
    }
  };

  return (
    <div
      className={` flex justify-between item-center md:gap-1 gap-4 border-primary-300 border-b py-6 md:px-3`}
    >
      <div>
        <button
          onClick={triggerSeen}
          className="h-10 w-10 rounded-8 flex items-center justify-center bg-primary-400"
          disabled={seen}
        >
          {seen ? (
            <CircularProgress size={15} />
          ) : (
            <img src="./img/cancel.svg" alt="x" />
          )}
        </button>
      </div>
      <div className="flex-col flex">
        <p className={`font-bold text-secondary-900`}>{heading}</p>
        <p>{message}</p>
      </div>
      <div>
        <p>
          {moment(date).format("hh:mm:ss a")} <br />
          {moment(date).format("DD/mm/yyyy")}
        </p>
      </div>
    </div>
  );
}

export default NotificationCard;
