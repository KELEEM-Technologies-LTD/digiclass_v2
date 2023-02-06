import { Popover, Transition } from "@headlessui/react";
import { Box } from "@mui/material";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "../../context/general_context";

const UserDropDown = () => {

    const { user } = useContext(GeneralContext);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (<Popover className="relative">
        {({ open }) => (
            <Box>
                <Popover.Button
                    className={classNames(
                        open ? 'text-primary-900' : 'text-primary-500',
                        'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 mt-1'
                    )}
                >
                    <div className="h-12 w-12  rounded-full bg-secondary-600 flex justify-center items-center">
                        <p className="text-white text-xs">
                            {user.first_name[0]} {user.last_name[0]}
                        </p>
                    </div>
                </Popover.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"

                >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2" style={{ zIndex: '100' }}>
                        <div className=" bg-white rounded-5 font-serif overflow-y-hidden">
                            <div className="grid grid-cols-12 gap-3 py-6 px-4 ">
                                {user.profile_pic ? (
                                    <div className=" col-span-3 h-16 w-16 bg-secondary-600 rounded-full flex items-center justify-center" >
                                        <img
                                            src={user.profile_pic}
                                            alt="profileimage"
                                            className="h-16 w-16 rounded-full"
                                        />
                                    </div>
                                ) : (
                                    <Link
                                        to="/profile"
                                        className=" col-span-3 h-16 w-16 bg-secondary-600 rounded-full flex items-center justify-center"
                                    >
                                        <p className="text-white font-bold text-lg">
                                            {user.first_name[0]} {user.last_name[0]}
                                        </p>
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
                            <div className=" py-4 px-4">
                                <ul>
                                    <li className="">
                                        <p>My Learning</p>
                                    </li>
                                    <li className="mt-2">
                                        <p>My Cart</p>
                                    </li>
                                    <li className="mt-2">
                                        <p>Teach on Digiclass</p>
                                    </li>
                                </ul>
                            </div>

                            <hr className="my-1 mx-5 border-t border-secondary-400" />
                            <div className=" py-4 px-4">
                                <ul>
                                    <li className="">
                                        <Link to="/profile">
                                            <p>Notifications</p>
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link to="/messages">
                                            {" "}
                                            <p>Message</p>
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link to="/profile">
                                            {" "}
                                            <p>Account</p>
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link to="/profile">
                                            {" "}
                                            <p>Payment Methods</p>
                                        </Link>
                                    </li>

                                    <li className="mt-2">
                                        <Link to="/profile">
                                            {" "}
                                            <p>Edit Profile</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <button
                                //  onClick={handleLogoutUser} 
                                className="flex gap-6 px-4 my-12 ">
                                <img src="./img/logout.svg" alt="logout" />
                                <p>Logout</p>
                            </button>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Box>
        )}
    </Popover>)
}

export default UserDropDown;