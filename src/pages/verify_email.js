import { useLayoutEffect, useState } from "react";
import { displaySuccMsg } from "../component/alerts/alerts";
import { HashLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 20% auto;
`;

const VerifyEmail = () => {
  useLayoutEffect(() => {
    setTimeout(() => {
      displaySuccMsg("Email verification successful", () => {
        // window.location.href = "/";
      });
    }, 4000);
  }, []);

  const contacts = [
    { name: "John Doe A very long name" },
    { name: "Jane Doe" },
    { name: "Bob Smith" },
  ];
  const [messages, setMessages] = useState([
    { sender: "John Doe", message: "Hello, how are you?" },
    { sender: "You", message: "I am doing well, thank you for asking." },
    { sender: "John Doe", message: "That is great to hear!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, { sender: "You", message: newMessage }]);
    setNewMessage("");
  };

  return (
    <>
      {/* <div className="flex justify-center items-center h-screen">
        <HashLoader color="#4080ff" css={override} loading={true} size={100} />
      </div> */}
      <div className="flex flex-row h-screen bg-primary-100">
        {/* Contact list */}
        <div className="flex flex-col w-1/4 bg-[white] border-r">
          <h2 className="p-4 text-xl font-bold border-b">Contacts</h2>
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className="p-4 hover:bg-primary-200 cursor-pointer"
            >
              {contact.name}
            </div>
          ))}
        </div>

        {/* Chat window */}
        <div className="flex flex-col flex-grow bg-primary-200">
          <div className="flex flex-col flex-grow overflow-y-scroll">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex p-4 ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    message.sender === "You"
                      ? "bg-secondary-500 text-[white] rounded-br-none"
                      : "bg-[white] text-primary-800 rounded-bl-none"
                  }`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message here"
              className="flex-grow p-2 rounded-none focus:outline-none"
              value={newMessage}
              onChange={handleNewMessageChange}
            />
            <button
              type="button"
              className="bg-secondary-500 hover:bg-secondary-700 text-[white] font-bold py-2 px-4 rounded-none focus:outline-none"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
