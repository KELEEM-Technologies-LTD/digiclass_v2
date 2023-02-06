import React from "react";
import { useNavigate } from "react-router-dom";

function CourseCard({ showProgress, item }) {
  const { thumbnail, title, course_id, price } = item;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/course/${course_id}`)}
      className=" cursor-pointer md:shadow-outlineLg course-card flex md:flex-col mr-1 md:bg-white rounded-5 hover:border-secondary-500 mb-5"
    >
      <img src={thumbnail} alt="courseimage" className="w-36 md:w-full" />
      <div className="p-3 md:bg-white ">
        <p className="md:text-lg text-sm font-bold">{title}</p>
        {!showProgress ? (
          <div className="flex md:flex-col flex-col-reverse ">
            <div className="flex justify-between mt-5">
              <p className=" font-bold text-sm"> GHS {price}</p>
              <p className=" text-sm line-through">GHS 13.99</p>
            </div>
            <div className="flex ">
              <p className="font-bold text-sm text-secondary-500 ">4.5</p>
              <div className="flex justify-between items-center ml-1">
                <i className="fa fa-star text-secondary-500 text-sm"></i>
                <i className="fa fa-star text-secondary-500 text-sm"></i>
                <i className="fa fa-star text-secondary-500 text-sm"></i>
                <i className="fa fa-star text-secondary-500 text-sm"></i>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center mt-12">
            <img src="./img/smallplay.svg" alt="playicon" />
            <p className="text-secondary-700">0/50</p>
            <p className="text-secondary-700">Complete</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
