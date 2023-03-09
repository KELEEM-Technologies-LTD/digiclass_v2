import localforage from "localforage";
import moment from "moment";
import React, { useEffect, useState } from "react";

function NotificationCardRead({ data }) {
  const { heading, message, date, id } = data;

  return (
    <div className="flex justify-between item-center md:gap-1 gap-4 border-primary-300 border-b py-6 md:px-3">
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
