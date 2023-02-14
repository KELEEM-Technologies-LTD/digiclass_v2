import React from "react";
// import { NotificationTitleColor } from "../../Helpers/";
function NotificationCard() {
  return (
    <div className="flex justify-between item-center md:gap-1 gap-4 border-primary-300 border-b py-6 md:px-3">
      <div>
        <button
          // onClick={() => id && handleDeleteNotification(id)}
          className="h-10 w-10 rounded-8 flex items-center justify-center bg-primary-400"
        >
          <img src="./img/cancel.svg" alt="x" />
        </button>
      </div>
      <div className="flex-col flex">
        <p className={`font-bold text-secondary-900`}>Update notification for mobile application</p>
        <p>There is a major upgrade</p>
      </div>
      <div>
        <p>22/02/2022</p>
      </div>
    </div>
  );
}

export default NotificationCard;
