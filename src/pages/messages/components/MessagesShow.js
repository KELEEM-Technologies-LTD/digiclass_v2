import { Avatar } from "@mui/material";
import localforage from "localforage";
import { useEffect, useLayoutEffect, useState } from "react";
import { displayWarningMsg } from "../../../component/alerts/alerts";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";
import { Left, Right } from "./message";

const MessagesShow = ({ chat, onClick }) => {
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState("");
  const [chats, setchats] = useState([]);

  const chatid = chat.reciever ? chat.reciever : chat.sender;

  useEffect(() => {
    getChats();
    getUser();
    const intervalId = setInterval(() => {
      relaodChats();
    }, 10000); // 1 minute in milliseconds

    return () => clearInterval(intervalId);
  }, [chat]);

  const [user, setUser] = useState([]);

  const getUser = async () => {
    setLoading(true);
    try {
      const instructor_res = await (
        await Services()
      ).get(global_variables().getMsgName + `/${chatid}`);
      setUser(instructor_res.data?.payload[0]);
      //   console.log(instructor_res.data?.payload[0]);
    } catch (error) {
      //   console.log(error);
    }
  };

  const relaodChats = async () => {
    const user = await localforage.getItem("userdata");
    setMe(user.user_id);
    if (chatid) {
      try {
        const res = await (
          await Services()
        ).post(global_variables().getMsg, {
          sender: user.user_id,
          reciever: chatid,
        });
        setchats(res.data?.payload);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getChats = async () => {
    // setLoading(true);
    const user = await localforage.getItem("userdata");
    setMe(user.user_id);

    if (chatid) {
      try {
        const res = await (
          await Services()
        ).post(global_variables().getMsg, {
          sender: user.user_id,
          reciever: chatid,
        });
        setchats(res.data?.payload);
        setLoading(false);

        setTimeout(function () {
          // do something here
          const el = document.getElementById("messages");
          if (el) {
            el.scrollTop = el.scrollHeight;
          }
        }, 100);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      {!chatid ? (
        <></>
      ) : loading ? (
        <div className="flex items-center justify-center h-screen">
          <img
            src="./img/loading.gif"
            alt="./img/loading.gif"
            className="h-10 w-10 object-center"
          />
        </div>
      ) : (
        <>
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <Avatar src={user?.profile_pic} alt="" />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">
                    {user?.first_name} {user?.last_name}
                  </span>
                </div>
                {/* <span className="text-lg text-gray-600">Junior Developer</span> */}
              </div>
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-secondary scrollbar-thumb-rounded scrollbar-track-secondary-lighter scrollbar-w-2 scrolling-touch"
          >
            {chats.map((message, key) => {
              return (
                <div key={message.id}>
                  {message.sender === me ? (
                    <Right message={message} />
                  ) : (
                    <Left message={message} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <form className="relative flex" onSubmit={sendMessage}>
              <span className="absolute inset-y-0 flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none hidden sm:inline-flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={onClick}
                  className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none  sm:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
              </span>
              <input
                type="text"
                placeholder="Write your message!"
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                value={txt}
                onChange={(e) => setTxt(e.target.value)}
                disabled={sending}
              />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-secondary-500 hover:bg-secondary-400 focus:outline-none"
                >
                  <span className="font-bold">Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default MessagesShow;
