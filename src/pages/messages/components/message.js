import moment from "moment";

export const Left = ({ message }) => {
  return (
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[white] text-primary-600">
              {message.message}
              <br />
              <small>
                {moment(message.timestamp_sent).format("DD/MM/YYYY HH:MM ")}
              </small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Right = ({ message }) => {
  return (
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-secondary-600 text-white ">
              {message.message}
              <br />
              <small>
                {moment(message.timestamp_sent).format("DD/MM/YYYY HH:MM ")}
              </small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
