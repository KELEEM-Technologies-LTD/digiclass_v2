import { Tab } from "@headlessui/react";
import { useState } from "react";
import InputWithIcon from "../../../component/InputFields/InputWithIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileSection = ({ user }) => {
  const { first_name, last_name, profile_pic, username, dob, resume } = user;

  const [fname, setFname] = useState(first_name);
  const [lname, setlanme] = useState(last_name);
  const [formdob, setDob] = useState(dob ? dob : "");
  const [formresume, setResume] = useState(resume ? resume : "");

  return (
    <>
      <div className="flex flex-col px-12 w-full py-10">
        <Tab.Group>
          <div className="flex flex-col font-serif ">
            <Tab.List>
              <div className="grid grid-cols-2 mt-4">
                <div className="col-span-1 flex">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "mr-5",
                        selected ? "border-b-2  border-secondary-600" : ""
                      )
                    }
                  >
                    Personal information
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "mr-5",
                        selected ? "border-b-2  border-secondary-600" : ""
                      )
                    }
                  >
                    Contact & location
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "mr-5",
                        selected ? "border-b-2  border-secondary-600" : ""
                      )
                    }
                  >
                    Change password
                  </Tab>
                </div>
              </div>
            </Tab.List>
          </div>
          <Tab.Panels style={{ minHeight: "50vh" }}>
            <Tab.Panel>
              <div className="flex gap-2 mt-10">
                <div className="h-16 w-16 rounded-full">
                  {profile_pic !== null ? (
                    <img
                      src={profile_pic}
                      alt="profileimage"
                      className="h-16 w-16 rounded-full"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary-500"></div>
                  )}
                </div>
                <div className="flex">
                  <div>
                    <p className="font-bold text-lg">Change Profile Image</p>
                    <p className="md:w-7/12">
                      Your profile picture can be changed once per month
                    </p>
                  </div>
                  <input
                    type="file"
                    id="file"
                    // ref={inputFile}
                    // onChange={handleSelectFile}
                    style={{ display: "none" }}
                  />
                  <button
                    // onClick={onUploadButtonClick}
                    className="hover:bg-secondary-600 hover:text-white h-10 flex-col items-center flex rounded-5 border-secondary-600 border py-2 px-8 bg-transparent"
                  >
                    <p>Upload</p>
                  </button>
                </div>
              </div>

              {/* General information  */}
              <div className="grid grid-cols-12">
                <div className="md:col-span-8 col-span-12  grid md:grid-cols-2 grid-cols-1  gap-12 mt-8">
                  <div className="">
                    <p>First Name</p>

                    <InputWithIcon
                      placeholder="Full name"
                      type="text"
                      name="firstName"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      className=" py-5 border-primary-600 border rounded-5 w-full  flex  bg-primary-100  justify-between"
                    />
                  </div>
                  <div className="">
                    <p>Last Name</p>

                    <InputWithIcon
                      placeholder="Phone number"
                      type="text"
                      name="lastName"
                      value={lname}
                      onChange={(e) => setlanme(e.target.value)}
                      className="py-5 border-primary-600 border rounded-5 w-full  flex bg-primary-100  justify-between"
                    />
                  </div>
                  <div>
                    <p>Date of birth</p>
                    <input
                      type="date"
                      value={formdob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                  <div>
                    <p>Bio</p>
                    <textarea
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-primary-900 bg-primary-100 rounded-lg border border-primary-300 focus:ring-secondary-400 focus:border-secondary-400 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-secondary-400 dark:focus:border-secondary-400"
                      placeholder="Write a short description about yourself"
                      value={formresume}
                      onChange={(e) => setResume(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="text-right">
                    <button
                      // onClick={handleSubject}
                      className="hover:bg-secondary-600 hover:text-white h-10 flex-col items-center flex rounded-5 border-secondary-600 border py-2 px-8 bg-transparent"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>
              {/* Passowrd settings  */}
              <div className="grid grid-cols-12">
                <div
                  style={{ height: "1.2px" }}
                  className=" bg-primary-200  col-span-8 my-12 w-full"
                />
              </div>
              <div className="grid grid-cols-12">
                <div className=" md:col-span-8 col-span-12 grid md:grid-cols-2 grid-cols-1  gap-12">
                  <div className="">
                    <p>Current password</p>

                    <InputWithIcon
                      placeholder="Current Password"
                      type="text"
                      className=" py-5 border-primary-600 border rounded-5 w-full  flex  bg-primary-100  justify-between"
                      name="password"
                      // value={state.password}
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <p>New Password</p>

                    <InputWithIcon
                      placeholder="New Password"
                      type="text"
                      className=" py-5 border-primary-600 border rounded-5 w-full  flex  bg-primary-100  justify-between"
                      name="c_password"
                      // value={state.c_password}
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="text-right">
                    <button
                      // onClick={handleUploadPassword}
                      className="hover:bg-secondary-600 hover:text-white h-10 flex-col items-center flex rounded-5 border-secondary-600 border py-2 px-8 bg-transparent"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default ProfileSection;
