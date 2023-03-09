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

function AboutAuthor({ instructor, instructor_id, courseid }) {
  const { isLogged } = useContext(GeneralContext);

  const cancelButtonRef = useRef(null);

  const { first_name, last_name, resume, user_role } = instructor;

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
                  </p>
                  <div className="flex justify-between">
                    <p>{user_role}</p>
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
    </>
  );
}

export default AboutAuthor;
