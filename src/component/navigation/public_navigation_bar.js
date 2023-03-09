import {
  AcademicCapIcon,
  Bars3Icon,
  BookOpenIcon,
  CreditCardIcon,
  EnvelopeIcon,
  GlobeEuropeAfricaIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useContext, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Logo, SearchIcon } from "../../assets";
import MyCartIcon from "./cart_on_nav";
import GeneralContext from "../../context/general_context";
import NavBarSeacrhField from "./search_onNav";
import MyNotificationIcon from "./notifications";
import MyFavorites from "./LoveIcon";
import UserDropDown from "./userDropDown";
import SignOut from "./signout_mobile";
import MyMiniCartIcon from "./mini_cart";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";

// const callsToAction = [
//     { name: 'Watch Demo', href: '#', icon: PlayIcon },
//     { name: 'Contact Sales', href: '#', icon: PhoneIcon },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavigationBar = () => {
  const [topics, setTopics] = useState([]);
  const { isLogged } = useContext(GeneralContext);

  const getCategories = async () => {
    try {
      const res = await (
        await Services()
      ).get(global_variables().getCategories);
      // console.log(res.data?.data?.data);
      setTopics(res.data?.data?.data);
    } catch (err) {
      // displayErrMsg("Error loading data, please reload page");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const currentUrl = window.location.href;

  return (
    <>
      <Popover className="relative bg-white shadow-2xl">
        {/* <div className="mx-auto max-w-7xl px-6"> */}
        <div className="mx-5">
          <div className="flex items-center justify-between border-b-2 border-primary-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start">
              <Link to="/" className="lg:mr-10">
                <span className="sr-only">DigiClass</span>
                <img className="h-8 w-auto sm:h-10" src={Logo} alt="" />
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-primary-400 hover:bg-primary-100 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-primary-900" : "text-primary-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 mt-1"
                      )}
                    >
                      <span>Categories</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-primary-600" : "text-primary-400",
                          "ml-2 h-5 w-5 group-hover:text-primary-500"
                        )}
                        aria-hidden="true"
                      />
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
                      <Popover.Panel
                        className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
                        style={{ zIndex: "100" }}
                      >
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {topics.map((item, index) => (
                              <Link
                                to="#"
                                onClick={() => {
                                  window.location.href = `/category/${item.category_id}/${item.name}`;
                                }}
                                key={item.name}
                                // href={item.href}
                                className="-m-3 flex items-start rounded-lg p-3 hover:bg-primary-50"
                              >
                                <BookOpenIcon
                                  className="h-6 w-6 flex-shrink-0 text-secondary-600"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-primary-900">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-sm text-primary-500">
                                    {item.name}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              {isLogged ? (
                <>
                  <NavBarSeacrhField />
                </>
              ) : (
                <Link
                  to="/signup"
                  className="text-base font-medium text-primary-500 hover:text-primary-900 mt-1"
                >
                  Teach on DigiClass
                </Link>
              )}
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              {isLogged ? (
                <>
                  <Link
                    to="/all"
                    className="text-base font-medium text-primary-500 hover:text-primary-900 mt-1 mr-4"
                  >
                    All courses
                  </Link>
                  {/* <MyFavorites /> */}
                  <MyCartIcon />
                  <MyNotificationIcon />
                  <UserDropDown />
                </>
              ) : (
                <>
                  <MyCartIcon />
                  <Link
                    to={`/login?currentUrl=${currentUrl}`}
                    className="whitespace-nowrap text-base font-medium text-primary-500 hover:text-primary-900"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-secondary-600 px-4 py-2 text-base font-medium text-white shadow-xl hover:bg-secondary-800"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-primary-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="h-8 w-auto" src={Logo} alt="Your Company" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-primary-400 hover:bg-primary-100 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {isLogged ? (
                      <>
                        <Link
                          to="/profile"
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50"
                        >
                          <UserCircleIcon
                            className="h-6 w-6 flex-shrink-0 text-secondary-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-primary-900">
                            Profile
                          </span>
                        </Link>
                        <Link
                          to="/all"
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50"
                        >
                          <AcademicCapIcon
                            className="h-6 w-6 flex-shrink-0 text-secondary-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-primary-900">
                            All courses
                          </span>
                        </Link>
                        <Link
                          to="/my-course"
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50"
                        >
                          <BookOpenIcon
                            className="h-6 w-6 flex-shrink-0 text-secondary-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-primary-900">
                            My courses
                          </span>
                        </Link>
                        <Link
                          to="/messages"
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50"
                        >
                          <EnvelopeIcon
                            className="h-6 w-6 flex-shrink-0 text-secondary-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-primary-900">
                            Messages
                          </span>
                        </Link>
                        <Link
                          to="/profile?tabindex=1"
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50"
                        >
                          <CreditCardIcon
                            className="h-6 w-6 flex-shrink-0 text-secondary-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-primary-900">
                            Payment Methods
                          </span>
                        </Link>
                        <Link
                          to="/all"
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50"
                        >
                          <GlobeEuropeAfricaIcon
                            className="h-6 w-6 flex-shrink-0 text-secondary-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-primary-900">
                            Browse course
                          </span>
                        </Link>
                      </>
                    ) : (
                      topics.map((item) => (
                        <Link
                          to="#"
                          key={item.name}
                          onClick={() => {
                            window.location.href = `/category/${item.category_id}/${item.name}`;
                          }}
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50"
                        >
                          <BookOpenIcon
                            className="h-6 w-6 flex-shrink-0 text-secondary-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-primary-900">
                            {item.name}
                          </span>
                        </Link>
                      ))
                    )}
                  </nav>
                </div>
              </div>

              <div className="space-y-6 py-6 px-5">
                {!isLogged && (
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <Link
                      to="/signup"
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50"
                    >
                      <AcademicCapIcon
                        className="h-6 w-6 flex-shrink-0 text-secondary-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-primary-900">
                        Teach on DigiClass
                      </span>
                    </Link>
                  </div>
                )}
                {isLogged ? (
                  <div className="flex justify-between">
                    <MyMiniCartIcon />
                    <MyNotificationIcon />
                    <SignOut />
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/signup"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-secondary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary-700"
                    >
                      Sign up
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-primary-500">
                      Existing customer?{" "}
                      <Link
                        to="/login"
                        className="text-secondary-600 hover:text-secondary-500"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default NavigationBar;
