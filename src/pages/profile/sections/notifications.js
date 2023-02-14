import NotificationCard from "../../../component/cards/NotificationCard";

const Notifications = () => {
  return (
    <>
      <div className="flex flex-col md:px-12 px-4">
        <p className="my-2 font-bold text-lg text-black">
          Recent Notifications
        </p>
        <NotificationCard />

        <p className="my-2 font-bold text-lg mt-7">Read Notifications</p>
      </div>
    </>
  );
};

export default Notifications;
