import { Dialog, Transition } from "@headlessui/react";
import localforage from "localforage";
import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import GeneralContext from "../../context/general_context";
import logoutIcon from "./../../assets/svgs/logout.svg";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple, blue } from "@mui/material/colors";

const UserDropDown = () => {
  const { user, complete_user } = useContext(GeneralContext);
  const [open, setOpen] = useState(false);

  const handleLogoutUser = () => {
    Swal.fire({
      icon: "warning",
      position: "top-right",
      // title: '!!!!',
      text: "Are you sure you want to sign out?",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonColor: "red",
      reverseButtons: true,
    }).then((result) => {
      // result.isConfirmed
      if (result.isConfirmed) {
        localforage.clear().then(() => {
          window.location.href = "/login";
        });
      }
    });
  };

  return (
    <>
      {complete_user?.profile_pic ? (
        <div
          className="h-12 w-12  rounded-full flex justify-center items-center"
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(true)}
        >
          <Avatar
            alt={complete_user?.profile_pic}
            src={complete_user?.profile_pic}
          />
        </div>
      ) : (
        <>
          <Avatar
            sx={{ bgcolor: blue[600] }}
            onClick={() => setOpen(true)}
            style={{ cursor: "pointer" }}
          >
            {user.first_name[0]}
            {user.last_name[0]}
          </Avatar>
        </>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <div className="fixed inset-0 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md pl-6 pr-6">
                    <div className="flex font-serif flex-col overflow-y-scroll bg-transparent px-5">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="mt-8">
                          <div className="bg-white rounded-5 font-serif overflow-y-hidden">
                            <div className="grid grid-cols-12 gap-3 py-3 px-4 ">
                              {complete_user?.profile_pic ? (
                                <div className="col-span-3 flex items-center justify-center">
                                  <Avatar
                                    alt={complete_user?.profile_pic}
                                    src={complete_user?.profile_pic}
                                  />
                                </div>
                              ) : (
                                <Link
                                  to="/profile"
                                  className="col-span-3 flex items-center justify-center"
                                >
                                  <Avatar
                                    sx={{ bgcolor: blue[600] }}
                                    onClick={() => setOpen(true)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {user.first_name[0]}
                                    {user.last_name[0]}
                                  </Avatar>
                                </Link>
                              )}
                              <div className="col-span-9">
                                <p className="text-black font-bold text-lg">
                                  {user.first_name} {user.last_name}
                                </p>
                                <p>{user.email}</p>
                              </div>
                            </div>
                            <hr className="my-1 mx-5 border-t border-secondary-400" />
                            <div className="py-4 px-4">
                              <ul>
                                <li className="">
                                  <Link to="/my-course">
                                    <p className="text-primary-500 hover:text-primary-900">
                                      My courses
                                    </p>
                                  </Link>
                                </li>
                                <li className="mt-5">
                                  <Link to="/cart">
                                    <p className="text-primary-500 hover:text-primary-900">
                                      My Cart
                                    </p>
                                  </Link>
                                </li>
                                {}
                                <li className="mt-5">
                                  <Link to="/signup">
                                    <p className="text-primary-500 hover:text-primary-900">
                                      Teach on Digiclass
                                    </p>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <hr className="my-1 mx-5 border-t border-secondary-400" />
                            <div className="py-4 px-4">
                              <ul>
                                <li className="">
                                  <Link to="/messages">
                                    <p className="text-primary-500 hover:text-primary-900">
                                      Message
                                    </p>
                                  </Link>
                                </li>
                                <li className="mt-5">
                                  <Link to="/profile?tabindex=0">
                                    <p className="text-primary-500 hover:text-primary-900">
                                      Account
                                    </p>
                                  </Link>
                                </li>
                                <li className="mt-5">
                                  <Link to="/profile?tabindex=1">
                                    <p className="text-primary-500 hover:text-primary-900">
                                      Payment Methods
                                    </p>
                                  </Link>
                                </li>
                                <li className="mt-5">
                                  <Link to="/profile?tabindex=2">
                                    <p className="text-primary-500 hover:text-primary-900">
                                      Notifications
                                    </p>
                                  </Link>
                                </li>
                                <li className="mt-5">
                                  <Link to="/profile?tabindex=3">
                                    <p className="text-primary-500 hover:text-primary-900">
                                      Transactions
                                    </p>
                                  </Link>
                                </li>

                                <li className="mt-5">
                                  <Link to="/profile">
                                    <p className="text-primary-500 hover:text-primary-900">
                                      Edit Profile
                                    </p>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <button
                              onClick={handleLogoutUser}
                              className="flex gap-6 px-4 mt-7 mb-5"
                            >
                              <img src={logoutIcon} alt="logout" />
                              <p>Logout</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UserDropDown;
