import React, { useContext, useEffect } from "react";
import GeneralContext from "../../../context/general_context";

function AboutAuthor({ instructor }) {
  const { isLogged } = useContext(GeneralContext);

  const { first_name, last_name, resume, user_role } = instructor;

  return (
    <div className="py-8 flex flex-col">
      {isLogged && (
        <>
          <p className="">Instructor</p>
          <div className="mt-10 flex flex-col md:px-36">
            <div className="flex items-center ">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-700">
                <p className="text-white font-bold text-lg">
                  {first_name[0] + last_name[0]}
                </p>
              </div>
              <div className="ml-4">
                <p className="font-bold text-lg text-black">
                  {first_name + " " + last_name}
                </p>
                <p>{user_role}</p>
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
  );
}

export default AboutAuthor;
