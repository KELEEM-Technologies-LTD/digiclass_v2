import moment from "moment";

const MessageLeft = ({ message }) => {
  return (
    <div className="p-4">
      <div className="flex">
        <div className="bg-[white] rounded-lg py-2 px-4 max-w-xs">
          {message}
        </div>
      </div>
      <div className="text-primary-500 text-sm mt-1">
        {moment(message.timestamp_sent).format("DD/MM/YYYY HH:MM ")}
      </div>
    </div>
  );
};

export default MessageLeft;
