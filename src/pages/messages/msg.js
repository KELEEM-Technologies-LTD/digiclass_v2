import React from "react";

const MessageWindow = () => {
  const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Bob Smith" },
    { id: 4, name: "Alice Johnson" },
  ];

  return (
    <div className="flex">
      {/* Side navigation */}
      <div
        className="flex-none w-64 bg-[white] shadow-md h-[80vh] flex flex-col"
        style={{ maxHeight: "80vh", overflowY: "scroll" }}
      >
        <div className="p-4 font-bold">Contacts</div>
        <div className="flex-grow overflow-y-scroll">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-primary-200 cursor-pointer"
            >
              {contact.name}
            </div>
          ))}
        </div>
      </div>
      {/* Main content */}
      <div className="flex-grow bg-primary-100 h-[80vh] flex flex-col justify-end">
        <div className="flex-grow overflow-y-scroll">
          {/* Example messages */}
          <div className="p-4">
            <div className="flex justify-end">
              <div className="bg-secondary-600 rounded-lg py-2 px-4 text-[white] max-w-xs">
                Hello! How are you?
              </div>
            </div>
            <div className="text-primary-500 text-sm mt-1 text-right">
              10:05 AM
            </div>
          </div>
          <div className="p-4">
            <div className="flex">
              <div className="bg-[white] rounded-lg py-2 px-4 max-w-xs">
                I'm good, thanks! How about you?
              </div>
            </div>
            <div className="text-primary-500 text-sm mt-1">10:07 AM</div>
          </div>
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
    </div>
  );
};

export default MessageWindow;
