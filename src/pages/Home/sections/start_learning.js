import React, { useRef } from "react";
import Slider from "react-slick";
import LectureCard from "../../../component/cards/lecture_card";
const data = [
  {
    title: "Complete Backend (API) Development with Python A-Z",
    image: "./img/l1.png",
  },
  {
    title: "Adobe Lightroom Masterclass - Beginner to Expert",
    image: "./img/l2.png",
  },
  {
    title: "Adobe Premiere Pro CC: Video Editing in Adobe Premiere Pro",
    image: "./img/l3.png",
  },
  {
    title: "Adobe Premiere Pro CC: Video Editing in Adobe Premiere Pro",
    image: "./img/l3.png",
  },
  {
    title: "Adobe Premiere Pro CC: Video Editing in Adobe Premiere Pro",
    image: "./img/l3.png",
  },
];
var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

function StartLearningRow() {
  const SliderRef = useRef(null);
  const handlePrev = () => {
    SliderRef.current.slickPrev();
  };

  const handleNext = () => {
    SliderRef.current.slickNext();
  };
  return (
    <div className=" py-2 md:pl-52  flex-col overflow-x-hidden md:flex hidden">
      <div className="flex justify-between">
        <p className="text-2xl font-bold text-black font-serif">Let's start learning</p>
        <div className="grid grid-cols-2 gap-6 md:pr-52">
          <button onClick={handlePrev}>
            <img src="./img/chevron-left.svg" alt="chev" />
          </button>
          <button onClick={handleNext}>
            <img src="./img/chevron-right.svg" alt="chev" />
          </button>
        </div>
      </div>

      <Slider ref={SliderRef} className="mt-6 " {...settings}>
        {data.map((item, index) => (
          <LectureCard data={item} key={index} />
        ))}
      </Slider>
    </div>
  );
}

export default StartLearningRow;
