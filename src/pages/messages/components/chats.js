import localforage from "localforage";
import { useEffect, useState } from "react";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";
import CircularProgress from "@mui/material/CircularProgress";
import MessageLeft from "./message_left";
import MessageRight from "./message_right";
import CachedIcon from "@mui/icons-material/Cached";
import { displayWarningMsg } from "../../../component/alerts/alerts";

const Chats = ({ chatid }) => {
  const [loading, setLoading] = useState(true);
  const [chats, setchats] = useState(true);
  const [me, setMe] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getChats = async () => {
    // setLoading(true);
    const user = await localforage.getItem("userdata");
    setMe(user.user_id);
    // console.log(user.user_id);
    // console.log(chatid);

    if (chatid) {
      try {
        const res = await (
          await Services()
        ).post(global_variables().getMsg, {
          sender: user.user_id,
          reciever: chatid,
        });

        // console.log(res.data?.payload);
        setchats(res.data?.payload);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getChats();

    const intervalId = setInterval(() => {
      getChats();
    }, 10000); // 1 minute in milliseconds

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatid]);

  const [txt, setTxt] = useState("");
  const [sending, setSending] = useState(false);
  const sendMessage = async (e) => {
    setSending(true);
    e.preventDefault();
    if (txt === "") {
      displayWarningMsg("please type a message");
      setSending(false);
    } else {
      try {
        const res = await (
          await Services()
        ).post(global_variables().sendMsg, {
          sender: me,
          reciever: chatid,
          message: txt,
        });

        getChats();
        console.log(txt);
        setTxt("");
        setSending(false);
      } catch (error) {
        setTxt("");
        console.log(error);
        setSending(false);
      }
    }
  };

  return (
    <>
      <div className="flex-grow overflow-y-scroll">
        {/* Example messages */}
        {chatid ? (
          loading ? (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress ize={80} color="primary" />
            </div>
          ) : (
            <>
              {chats.map((message) => (
                <div key={message.id}>
                  {message.sender === me ? (
                    <MessageRight message={message.message} />
                  ) : (
                    <MessageLeft message={message.message} />
                  )}
                </div>
              ))}
            </>
          )
        ) : (
          <div className="mt-20 text-center">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-primary-200">
        <form onSubmit={sendMessage} className="flex">
          <div>
            <button
              className="mr-4 bg-secondary-600 text-[white] px-4 py-2 rounded-lg"
              onClick={getChats}
            >
              <CachedIcon />
            </button>
          </div>
          <div className="flex-grow">
            <input
              type="text"
              className="w-full border-primary-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-600"
              placeholder="Type a message..."
              value={txt}
              onChange={(e) => setTxt(e.target.value)}
              disabled={sending}
            />
          </div>
          <button
            className="ml-4 bg-secondary-600 text-[white] px-4 py-2 rounded-lg"
            onClick={sendMessage}
          >
            {sending ? (
              <>
                <CircularProgress size={20} />
              </>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Chats;
