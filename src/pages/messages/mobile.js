import localforage from "localforage";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import ContactCardNew from "./components/contact";

const MobileMessages = () => {
  const [showIndex, setShowIndex] = useState(0);
  const navigate = useNavigate();

  const [contactLoading, setContactLoading] = useState(true);
  const [contactList, setContactList] = useState([]);
  const [req, setReq] = useState([]);
  const getContactList = async () => {
    setContactLoading(true);
    const user = await localforage.getItem("userdata");
    // console.log(user);
    try {
      const res = await (
        await Services()
      ).post(global_variables().getContactList, {
        sender: user.user_id,
      });
      // console.log(res.data?.payload);
      setContactList(res.data?.payload);
      setContactLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getRequest = async () => {
    const user = await localforage.getItem("userdata");
    // console.log(user);
    try {
      const res = await (
        await Services()
      ).post(global_variables().getRequestList, {
        sender: user.user_id,
      });
      console.log(res.data?.payload);
      setReq(res.data?.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactList();
    getRequest();
  }, []);
  return (
    <>
      <aside className="flex">
        <div className="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-primary-900 dark:border-primary-700">
          <Link to="/">
            <img className="w-auto h-6" src="./../img/loading.gif" alt="" />
          </Link>
          <Link
            to="#"
            onClick={() => {
              setShowIndex(0);
            }}
            className="p-1.5 text-primary-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-primary-400 dark:hover:bg-primary-800 hover:bg-primary-100"
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
                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </Link>
          <Link
            to="#"
            onClick={() => {
              setShowIndex(1);
            }}
            className="p-1.5 text-primary-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-primary-400 dark:hover:bg-primary-800 hover:bg-primary-100"
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
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </Link>
        </div>
        <div
          className={`h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-full dark:bg-primary-900 dark:border-primary-700`}
        >
          {showIndex === 0 ? (
            <>
              <h2 className="px-5 text-lg font-medium text-primary-800 dark:text-white">
                Messages
              </h2>
              <div className="mt-8 space-y-4">
                {contactLoading ? (
                  <>
                    <img src="./../img/loading.gif" alt="" />
                  </>
                ) : contactList.length === 0 ? (
                  <div className="px-4 py-2 text-[black] text-center">
                    <p>You do not have a chats</p>
                  </div>
                ) : (
                  contactList.map((contact, index) => (
                    <ContactCardNew
                      key={index}
                      reciever={contact.reciever}
                      sender={contact.sender}
                      onClick={() =>
                        navigate(`/messages/mobile/${contact.reciever}`)
                      }
                    />
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="px-5 text-lg font-medium text-primary-800 dark:text-white">
                Chat Requests
              </h2>
              <div className="mt-8 space-y-4">
                {req.length === 0 ? (
                  <div className="px-4 py-2 text-[black] text-center">
                    <p>You do not have a requests</p>
                  </div>
                ) : (
                  req.map((contact, index) => (
                    <ContactCardNew
                      key={index}
                      reciever={contact.sender}
                      sender={contact.sender}
                      onClick={() =>
                        navigate(`/messages/mobile/${contact.sender}`)
                      }
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default MobileMessages;
