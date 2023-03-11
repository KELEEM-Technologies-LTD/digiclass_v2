import { Avatar, CircularProgress } from "@mui/material";
import localforage from "localforage";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "../../assets";
import { displayWarningMsg } from "../../component/alerts/alerts";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import { Left, Right } from "./components/message";
import MessageLeft from "./components/message_left";
import MessageRight from "./components/message_right";

const MobileChat = () => {
  const { chatid } = useParams();
  const navigate = useNavigate();

  const [chats, setchats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState("");

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
          // console.log(el);
        }, 100);
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  useEffect(() => {
    getChats();
    getUser();
    const intervalId = setInterval(() => {
      relaodChats();
    }, 10000); // 1 minute in milliseconds

    return () => clearInterval(intervalId);
  }, []);

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
      <>
        {!chatid ? (
          <></>
        ) : loading ? (
          <div className="flex items-center justify-center">
            <img
              src="./../../img/loading.gif"
              alt="./img/loading.gif"
              className="h-10 w-10 object-center"
            />
          </div>
        ) : (
          <>
            <div
              className="flex-grow bg-primary-100 flex flex-col justify-end"
              style={{
                maxHeight: "86vh",
                minHeight: "86vh",
                overflowY: "scroll",
              }}
            >
              <div className="flex-grow overflow-y-scroll">
                {loading ? (
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
                  <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
                    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                      <div className="relative flex items-center space-x-4">
                        <div className="relative">
                          {user.profile_pic ? (
                            <Avatar
                              src={user?.profile_pic}
                              alt=""
                              // className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                            />
                          ) : (
                            <Avatar />
                          )}
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
                      {chats.map((message) => (
                        <div key={message.id}>
                          {message.sender === me ? (
                            <Right message={message} />
                          ) : (
                            <Left message={message} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-primary-200">
                <form onSubmit={sendMessage} className="flex">
                  <div>
                    <button
                      type="button"
                      className="mr-4 bg-secondary-600 text-[white] px-4 py-2 rounded-lg"
                      onClick={() => navigate("/messages/mobile")}
                    >
                      <ArrowBack />
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
            </div>
          </>
        )}
      </>
    </>
  );
};

export default MobileChat;
