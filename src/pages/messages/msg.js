import { Avatar } from "@mui/material";
import React, { useState } from "react";
import MessageLeft from "./components/message_left";
import MessageRight from "./components/message_right";

const MessageWindow = () => {
  const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Bob Smith" },
    { id: 4, name: "Alice Johnson" },
  ];

  const [showDrawer, setShowDrawer] = useState(true);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Side navigation */}
      <div
        className="flex-none hidden md:block md:w-64 bg-[white] shadow-md flex flex-col"
        style={{ maxHeight: "80vh", minHeight: "80vh", overflowY: "scroll" }}
      >
        <div className="p-4 font-bold">Contacts</div>
        <div className="flex-grow overflow-y-scroll">
          {contacts.map((contact) => (
            <div
              className="flex px-4 py-2 text-[black] hover:bg-primary-200 cursor-pointer"
              key={contact.id}
            >
              <Avatar>AE</Avatar>
              <div className="ml-3 mt-2">{contact.name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Main content */}
      <div
        className="flex-grow bg-primary-100 flex flex-col justify-end"
        style={{ maxHeight: "80vh", minHeight: "80vh", overflowY: "scroll" }}
      >
        <div className="flex-grow overflow-y-scroll">
          {/* Example messages */}
          <MessageRight />
          <MessageLeft />
          <MessageRight />
          <MessageLeft />
          <MessageRight />
          <MessageLeft />
          <MessageRight />
          <MessageLeft />
          <MessageRight />
          <MessageLeft />
          <MessageRight />
          <MessageLeft />
          <MessageRight />
          <MessageLeft />
        </div>
        <div className="p-4 bg-[white]">
          <div className="flex">
            <div className="flex-grow">
              <input
                type="text"
                className="w-full border-primary-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-600"
                placeholder="Type a message..."
              />
            </div>
            <button className="ml-4 bg-secondary-600 text-[white] px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
      {/* Drawer button */}
      <div className="md:hidden fixed bottom-4 right-4">
        <button
          className="bg-secondary-600 text-[white] px-4 py-2 rounded-lg"
          onClick={toggleDrawer}
        >
          Contacts
        </button>
      </div>
      {/* Drawer */}
      {showDrawer && (
        <div className="md:hidden fixed inset-0 bg-primary-500 bg-opacity-50">
          <div className="bg-white shadow-md h-full flex flex-col w-64">
            <div className="p-4 font-bold">Contacts</div>
            <div className="flex-grow overflow-y-scroll">
              {contacts.map((contact) => (
                <div
                  className="flex px-4 py-2 text-[black] hover:bg-primary-200 cursor-pointer"
                  key={contact.id}
                >
                  <Avatar>AE</Avatar>
                  <div className="ml-3 mt-2">{contact.name}</div>
                </div>
              ))}
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
