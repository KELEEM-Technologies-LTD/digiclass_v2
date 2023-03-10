import { MessageOutlined } from "@mui/icons-material";
import React, { useContext, Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "../../../context/general_context";
import { Dialog, Transition } from "@headlessui/react";
import {
  displaySuccMsg,
  displayWarningMsg,
} from "../../../component/alerts/alerts";
import { CircularProgress } from "@mui/material";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";
import localforage from "localforage";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function AboutAuthor({ instructor, instructor_id }) {
  const { isLogged } = useContext(GeneralContext);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const cancelButtonRef = useRef(null);

  const { first_name, last_name, resume, user_role } = instructor;

  const sendmessage = async () => {
    setSending(true);
    if (message === "") {
      displayWarningMsg("Please type  a message to the course instructor");
      setSending(false);
    } else {
      // setSending(true);

      const user = await localforage.getItem("userdata");
      // const messageData = {
      //   course_id: courseid,
      //   title: title,
      //   student_id: user.user_id,
      //   body: message,
      //   instructor_id: instructor_id,
      // };
      // console.log(messageData);
      try {
        const res = await (
          await Services()
        ).post(global_variables().sendMsg, {
          sender: user.user_id,
          reciever: instructor_id,
          message: message,
        });
        displaySuccMsg(
          "Message sent to instructor, the instructor would reply you as soon as possible, check your messages.",
          () => {}
        );
        setOpen(false);
        setSending(false);
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="py-8 flex flex-col">
        {isLogged && (
          <>
            <p className="">Instructor</p>
            <div className="mt-10 flex flex-col md:px-36">
              <div className="flex items-center ">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-700">
                  <p className="text-[white] font-bold text-lg">
                    {first_name[0] + last_name[0]}
                  </p>
                </div>
                <div className="ml-4">
                  <p className="font-bold text-lg text-black">
                    {first_name + " " + last_name}
                    <Link to={`/instructor/${instructor_id}`}>
                      <OpenInNewIcon />
                    </Link>
                  </p>
                  <div className="flex justify-between">
                    <p>{user_role}</p>
                    <Link to="#" onClick={() => setOpen(true)}>
                      <MessageOutlined />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <p className="font-bold text-black">About the author</p>
                <p className="md:mt-5">{resume}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[white] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-[white] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-primary-900"
                        >
                          Send Author a message
                        </Dialog.Title>
                        <hr className="my-3 bg-secondary-300" />
                        <div className="mb-6">
                          <label
                            htmlFor="message"
                            className="block text-primary-700 font-bold mb-2"
                          >
                            Message
                          </label>
                          <textarea
                            rows="3"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondary-600 px-4 py-2 text-base font-medium text-[white] shadow-sm hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={sendmessage}
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <CircularProgress
                            size={20}
                            className="text-color-[white]"
                          />
                        </>
                      ) : (
                        "send"
                      )}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-primary-300 bg-[white] px-4 py-2 text-base font-medium text-primary-700 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setOpen(false);
                        setSending(false);
                        setMessage("");
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default AboutAuthor;
