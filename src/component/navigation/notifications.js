import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BellIcon } from "../../assets";
import GeneralContext from "../../context/general_context";

const MyNotificationIcon = () => {
  const [count, setCount] = useState(0);

  const { notifications, user } = useContext(GeneralContext);

  useEffect(() => {
    const notSeenArr = notifications.filter(
      (obj) => !obj.view.includes(user.user_id)
    );

    setCount(parseInt(notSeenArr.length));
  }, []);

  return (
    <Link to="/profile?tabindex=1" className="relative mr-5">
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
