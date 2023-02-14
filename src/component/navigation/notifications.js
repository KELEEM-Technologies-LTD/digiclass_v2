import React from "react";
import { Link } from "react-router-dom";
import { BellIcon } from "../../assets";

const MyNotificationIcon = () => {
  const count = 0;

  return (
    <Link to="/profile?tabindex=2" className="relative mr-5">
      <BellIcon />
      {count > 0 && (
        <p className="absolute bottom-3 left-2 h-5 w-5 text-sm text-white rounded-full bg-secondary-600 flex items-center justify-center">
          {count}
        </p>
      )}
    </Link>
  );
};

export default MyNotificationIcon;
