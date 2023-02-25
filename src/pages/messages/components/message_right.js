import moment from "moment";

const MessageRight = ({ message }) => {
  return (
    <div className="p-4">
      <div className="flex justify-end">
        <div className="bg-secondary-600 rounded-lg py-2 px-4 text-[white] max-w-xs">
          {message}
        </div>
      </div>
      <div className="text-primary-500 text-sm mt-1 text-right">
        {moment(message.timestamp_sent).format("DD/MM/YYYY HH:MM ")}
      </div>
    </div>
  );
};

export default MessageRight;
