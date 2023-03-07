import { Skeleton } from "@mui/material";
import localforage from "localforage";
import React, { useEffect, useState } from "react";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import Chats from "./components/chats";
import ContactCard from "./components/contact_card";

const MessageWindow = () => {
  const [loading, setLoading] = useState(true);
  const [contactlist, setContactList] = useState([]);
  const [req, setReq] = useState([]);
  const [chatToShow, setChatToShow] = useState("");
  const [active, setActive] = useState("");

  const getContactList = async () => {
    setLoading(true);
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
      setLoading(false);
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
      // console.log(res.data?.payload);
      setReq(res.data?.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactList();
    getRequest();
  }, []);

  const [showDrawer, setShowDrawer] = useState(true);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Side navigation */}
      <div
        className="flex-none hidden md:block md:w-64 bg-[white] shadow-md flex-col"
        style={{
          maxHeight: "86vh",
          minHeight: "86vh",
          overflowY: "scroll",
          width: "30vw",
        }}
      >
        <div className="p-4 font-bold text-center">Messages</div>
        <div className="flex-grow overflow-y-scroll">
          {loading ? (
            <div className="px-4 py-2 text-[black]">
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
            </div>
          ) : contactlist.length === 0 ? (
            <div className="px-4 py-2 text-[black] text-center">
              <p>You do not have a chats</p>
            </div>
          ) : (
            contactlist.map((contact, index) => (
              <ContactCard
                key={index}
                reciever={contact.reciever}
                sender={contact.sender}
                setChatToShow={setChatToShow}
                chatToShow={chatToShow}
                toggleDrawer={toggleDrawer}
                active={active}
                setActive={setActive}
              />
            ))
          )}
          <hr className="mx-5 mt-5" />
          <p className="p-4 font-bold text-center">Chat request</p>
          {req.length === 0 ? (
            <div className="px-4 py-2 text-[black] text-center">
              <p>You do not have a requests</p>
            </div>
          ) : (
            req.map((contact, index) => (
              <ContactCard
                key={index}
                reciever={contact.sender}
                sender={contact.sender}
                setChatToShow={setChatToShow}
                chatToShow={chatToShow}
                toggleDrawer={toggleDrawer}
                active={active}
                setActive={setActive}
              />
            ))
          )}
        </div>
      </div>
      {/* Main content */}
      <div
        className="flex-grow bg-primary-100 flex flex-col justify-end"
        style={{ maxHeight: "86vh", minHeight: "86vh", overflowY: "scroll" }}
      >
        <Chats chatid={chatToShow} />
      </div>
      {/* Drawer button */}
      <div className="md:hidden fixed top-12 left-4">
        <button
          className="bg-secondary-400 text-[white] px-4 py-2 rounded-lg"
          onClick={toggleDrawer}
        >
          Messages
        </button>
      </div>
      {/* Drawer */}
      {showDrawer && (
        <div className="md:hidden fixed inset-0 bg-primary-500 bg-opacity-50">
          <div className="bg-white shadow-md h-full flex flex-col w-64">
            <div className="p-4 font-bold text-[black] text-center">
              Messages
            </div>
            <div className="flex-grow overflow-y-scroll">
              {loading ? (
                <div className="px-4 py-2 text-[black]">
                  <Skeleton height={50} />
                  <Skeleton height={50} />
                  <Skeleton height={50} />
                </div>
              ) : contactlist.length === 0 ? (
                <div className="px-4 py-2 text-[black] text-center">
                  <p>You do not have a chats</p>
                </div>
              ) : (
                contactlist.map((contact, index) => (
                  <ContactCard
                    key={index}
                    reciever={contact.reciever}
                    sender={contact.sender}
                    setChatToShow={setChatToShow}
                    chatToShow={chatToShow}
                    toggleDrawer={toggleDrawer}
                    active={active}
                    setActive={setActive}
                  />
                ))
              )}
              <hr className="mx-5 mt-5" />
              <p className="p-4 font-bold text-center">Chat request</p>
              {req.length === 0 ? (
                <div className="px-4 py-2 text-[black] text-center">
                  <p>You do not have a requests</p>
                </div>
              ) : (
                req.map((contact, index) => (
                  <ContactCard
                    key={index}
                    reciever={contact.sender}
                    sender={contact.sender}
                    setChatToShow={setChatToShow}
                    chatToShow={chatToShow}
                    toggleDrawer={toggleDrawer}
                    active={active}
                    setActive={setActive}
                  />
                ))
              )}
            </div>
            <div className="p-4">
              <button
                className="bg-[red] text-white px-4 py-2 rounded-lg"
                onClick={toggleDrawer}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageWindow;
