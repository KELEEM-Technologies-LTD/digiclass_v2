import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StarFill, StarOutline } from "../../../assets";
import { Dialog, Transition } from "@headlessui/react";
import GeneralContext from "../../../context/general_context";
import calender from "./../../../assets/svgs/wallet.svg";
import languageicon from "./../../../assets/svgs/voice.svg";
import moment from "moment";
import {
  displayErrMsg,
  displaySuccMsg,
} from "../../../component/alerts/alerts";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

function AboutCourse({ course_detail, instructor }) {
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  const {
    title,
    short_description,
    course_id,
    language,
    updatedAt,
    thumbnail,
    price,
  } = course_detail;
  const { first_name, last_name } = instructor;

  // console.log(course_detail);

  let [isOpen, setIsOpen] = useState(false);
  const { isLogged, getCartData } = useContext(GeneralContext);

  const addCourseToCart = async () => {
    // displaySuccMsg("");
    setAdding(true);

    const course_data = {
      course_id: course_id,
      description: title,
      price: price !== null ? price : 0.01,
      image: thumbnail,
    };

    try {
      const res = await (
        await Services()
      ).post(global_variables().addToCart, course_data);
      // console.log(res);
      displaySuccMsg(res.data?.status + " Course added to cart", () => {
        getCartData();
        setAdding(false);
      });
    } catch (err) {
      displayErrMsg("Error adding course to cart");
      console.log(err);
      setAdding(false);
      getCartData();
    }
  };

  return (
    <div
      className={`flex py-20 md:px-24 px-3 md:flex-row items-center flex-col-reverse  md:gap-40 bg-black opacity-80 h-full`}
    >
      <>
        <div className="flex flex-col md:mt-0 mt-6  ">
          <p className="md:text-4xl text-3xl font-bold text-white opacity-100">
            {title}
          </p>
          <p className="text-md mt-0">{short_description}</p>
          <div className="flex mt-3">
            <div className="flex items-center">
              <p className="font-bold text-sm text-secondary-500 ">4.5</p>
              <div className="flex gap-1 items-center ml-1">
                <StarFill width={14} />
                <StarFill width={14} />
                <StarFill width={14} />
                <StarOutline width={14} />
                <StarOutline width={14} />
              </div>
            </div>
            <p className="ml-3">(408 ratings) 16,363 students</p>
          </div>
          <div className="flex items-center mt-3">
            <i className="fa fa-graduation-cap text-white mr-2 "></i>
            <p className="font-bold text-md text-white">
              Certificate of completion
            </p>
          </div>

          {isLogged && (
            <div className="flex items-center mt-2">
              <p className="mr-2">Created by</p>
              <Link to={`/instructor/${course_detail.instructor}`}>
                <p className="underline cursor-pointer">
                  {first_name + " " + last_name}
                </p>
              </Link>
            </div>
          )}
          <div className="flex gap-4">
            <div className="flex items-center mt-3">
              <img src={calender} alt="wallet" className="mr-2" />
              <p>Last updated {moment(updatedAt).format("Do MMM YYYY")} </p>
            </div>
            <div className="flex items-center mt-3">
              <img src={languageicon} alt="voice" className="mr-2" />
              <p>{language}</p>
            </div>
          </div>
          <div className=" grid md:grid-cols-2 grid-cols-1  gap-3 mt-6">
            <button
              size="big"
              className="outlineLg py-4 bg-secondary-600"
              onClick={
                isLogged
                  ? addCourseToCart
                  : () => {
                      displayErrMsg("Please login to add item to cart", () => {
                        navigate("/login");
                      });
                    }
              }
              disabled={adding}
            >
              {adding ? (
                <div className="flex justify-center items-center">
                  <div className="w-8 h-8 border-2 border-primary-800 rounded-full border-t-2 border-t-secondary-500 animate-spin"></div>
                </div>
              ) : (
                <p className="text-white">Add to cart</p>
              )}
            </button>
            <button
              size="big"
              className="outlineLg border-2 py-4 border-secondary-600"
            >
              <p className="text-white">Buy course now</p>
            </button>
          </div>
          <p className="text-center my-6">30-Day Money-Back Guarantee</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div
            className="flex flex-col justify-center items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(true)}
          >
            <img src="../img/play.png" alt="play" />
            <p className="text-white mt-2">Play course overview</p>
          </div>
        </div>
      </>

      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            // style={{width: '300px'}}
            onClose={() => setIsOpen(false)}
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
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto w-200">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 text-center text-secondary-400"
                    >
                      Course Preview
                    </Dialog.Title>
                    <div className="mt-2 container">
                      <iframe
                        width="100%"
                        // height="315"
                        src="https://www.youtube.com/embed/5oH9Nr3bKfw"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen={true}
                      ></iframe>
                    </div>

                    {/* <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Got it, thanks!
                      </button>
                    </div> */}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </div>
  );
}

export default AboutCourse;
