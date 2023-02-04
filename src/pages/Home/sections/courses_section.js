import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { courses } from "../data/courses";


const topics = [
    "Design",
    "Excel",
    "Web Development",
    "Javascript",
    "Data Science",
];
const CourseSection = () => {
    const isLoggedIn = false
    const [selected, setSelected] = useState("");

    // const history = useNavigate()

    return (
        <div className="bg-primary-100 py-10">
            <div className=" flex-col  flex px-6 py-4 md:px-16    ">
                <p className="font-bold md:text-3xl text-xl  text-dark">

                    <>
                        {!isLoggedIn
                            ? " Get a choice of your course"
                            : "Topics recomended for you "}
                    </>
                </p>
                <div
                    className=" hidden md:flex md:justify-between border-b-1 border-primary-400 "
                    style={{ borderBottomWidth: "1px" }}
                >
                    <div className="flex justify-between">
                        {topics.map((item, index) => (
                            <div
                                onClick={() => setSelected(item)}
                                className={`mr-3 py-3 px-6 flex justify-center items-center cursor-pointer ${selected === item ? "border-b-2 border-secondary-400" : ""
                                    }`}
                                key={index}
                            >
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                    <Link to="/all" className="flex justify-between items-center p-3">
                        <p className="text-accent mr-3">See All Courses</p>
                        <img src="./img/caret-right.svg" alt="caret-right" />
                    </Link>
                </div>
                <div className="flex flex-wrap mt-4 md:hidden">
                    {topics.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSelected(item)}
                            style={{ borderWidth: "1px" }}
                            className={` text-primary-600 mr-4 mt-1 flex justify-center items-center bg-primary-200 px-5 py-2 border-primary-500 rounded-full ${selected === item
                                ? "bg-secondary-800 text-white border-primary-100 border-0"
                                : ""
                                } `}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-cols-4 grid-cols-1 md:gap-2 gap-1 mt-12">
                    {/* {!isLoggedIn ? generalCourses.data.slice(0, limit ? limit : 8).map((item, index) => {
            item.id = item.course_id
            return (<CourseCard item={item} />)
          }) : courses.data.slice(0, limit ? limit : 8).map((item, index) => {
            item.id = item.course_id;
            return (<CourseCard item={item} />)
          })} */}
                </div>
            </div>

            {!isLoggedIn ? (
                <div className="grid md:grid-cols-2 gap-4 grid-cols-1     py-4 md:px-16 mt-28 flex-col">
                    <div className="relative hidden md:block ">
                        <div className="absolute top-0 left-0">
                            <img src="img/grillbg.svg" alt="bg" />
                        </div>

                        <div className="relative z-10">
                            <img src="img/woman.png" alt="bg" />
                        </div>

                        <div className="absolute bottom-0 right-0 z-0 ">
                            <img src="img/grillbg.svg" alt="bg" />
                        </div>
                    </div>

                    <img
                        src="./img/woman1_2.png"
                        alt="bg"
                        className="block md:hidden w-full"
                    />

                    <div className="flex flex-col justify-center px-4 py-8 md-py-0 md:px-0">
                        <p className="font-bold md:text-3xl text-2xl text-dark">
                            Learner outcomes on DigiClass
                        </p>
                        <div className="mt-2 ">
                            <p className="leading-2 md:w-90 md:leading-7 leading-7 text-xl">
                                <span className="font-bold text-secondary-500">87%</span> of
                                people learning for professional development
                                <span className="font-bold text-secondary-500">
                                    {" "}
                                    report career benefits
                                </span>{" "}
                                like getting a promotion, a raise, or starting a new career
                            </p>
                        </div>
                        <Link to="/signup"
                            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-secondary-600 px-10 py-4 text-base font-medium text-white shadow-xl w-10 hover:bg-secondary-800"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    );

}


export default CourseSection; 