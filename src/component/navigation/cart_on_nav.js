import React, { useState, Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartIcon } from "../../assets";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import GeneralContext from "../../context/general_context";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import { displayErrMsg, displaySuccMsg } from "../alerts/alerts";
import logout_and_redirect from "../hoc/logout-redirect";
import { formatCedis } from "../Helpers/money";

const MyCartIcon = () => {
  const { isLogged, cartLoading, cart, getCartData } =
    useContext(GeneralContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const count = cart.data?.length;

  const calculateTotal = () => {
    let sum = 0;

    for (let i = 0; i < cart.data?.length; i++) {
      sum += cart.data[i].price;
    }

    return sum;
  };

  const removeFromCart = async (id) => {
    try {
      const res = await (
        await Services()
      ).delete(global_variables().delFromCart + `/${id}`);

      // console.log(res);

      getCartData();
      displaySuccMsg(res.data?.data?.message, () => {});
    } catch (err) {
      if (err.response?.status === 401) {
        logout_and_redirect();
      }
      displayErrMsg("Error removing item from cart", () => {
        getCartData();
      });
    }
  };

  return (
    <>
      <div
        className="relative mr-5"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(true)}
      >
        <CartIcon />
        {count > 0 && (
          <p className="absolute bottom-3 left-4 h-5 w-5 text-sm text-white rounded-full bg-secondary-600 flex items-center justify-center">
            {count}
          </p>
        )}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-primary-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-primary-600 hover:text-primary-900"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          {isLogged ? (
                            <>
                              {cartLoading ? (
                                <Skeleton height={100} />
                              ) : count === 0 ? (
                                <p className="text-center">
                                  There are no items in your cart
                                </p>
                              ) : (
                                cart.data?.map((data, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="flow-root mt-3">
                                        <ul className="-my-6 divide-y divide-primary-200">
                                          <li className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-primary-200">
                                              <img
                                                src={data.image}
                                                alt="db"
                                                className="h-full w-full object-cover object-center"
                                              />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                              <div>
                                                <div className="flex justify-between text-base font-medium text-primary-900">
                                                  <h3>
                                                    <Link
                                                      to="#"
                                                      onClick={() => {
                                                        window.location.href =
                                                          `/course/` +
                                                          data.course_id;
                                                      }}
                                                    >
                                                      {data.description}
                                                    </Link>
                                                  </h3>
                                                  <p className="ml-4">
                                                    {formatCedis(data.price)}
                                                  </p>
                                                </div>
                                                <p className="mt-1 text-sm text-primary-500">
                                                  category
                                                </p>
                                              </div>
                                              <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-primary-500">
                                                  Qty 1
                                                </p>

                                                <div className="flex">
                                                  <button
                                                    type="button"
                                                    className="font-medium text-secondary-600 hover:text-secondary-500"
                                                    onClick={() => {
                                                      removeFromCart(
                                                        data.cart_id
                                                      );
                                                    }}
                                                  >
                                                    Remove
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                      <hr className="my-3 mx-5 border-t border-secondary-100" />
                                    </div>
                                  );
                                })
                              )}
                            </>
                          ) : (
                            <p className="text-center">
                              Please{" "}
                              <Link to="/login" className="text-secondary-400">
                                login
                              </Link>{" "}
                              to access cart
                            </p>
                          )}
                        </div>
                      </div>

                      {isLogged && (
                        <>
                          <div className="border-t border-primary-200 py-6 px-4 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-primary-900">
                              <p>Subtotal</p>
                              <p>{formatCedis(calculateTotal())}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-primary-500">
                              Taxes and discounts are calculated at checkout.
                            </p>
                            <div className="mt-6">
                              <Link
                                to="#"
                                className="flex items-center justify-center rounded-md border border-transparent bg-secondary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary-700"
                              >
                                Checkout
                              </Link>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-primary-500">
                              <p>
                                or{" "}
                                <button
                                  type="button"
                                  className="font-medium text-secondary-600 hover:text-secondary-500"
                                  onClick={() => navigate("/cart")}
                                >
                                  Go to cart
                                  <span aria-hidden="true"> &rarr;</span>
                                </button>
                              </p>
                            </div>
                          </div>
                        </>
                      )}
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

export default MyCartIcon;
