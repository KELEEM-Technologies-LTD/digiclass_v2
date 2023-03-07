import { Skeleton } from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import LectureCard from "../../../component/cards/lecture_card";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

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

  const [loading, setLoading] = useState(true);
  const [top5, setTop5] = useState([]);
  const get5Courses = async () => {
    setLoading(true);

    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses +
          `?size=5&query_fields=id,title,language,status,airtime,short_description,price`
      );
      setTop5(res.data?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get5Courses();
  }, []);

  return (
    <div className="py-2 px-5 flex-col overflow-x-hidden md:flex hidden">
      {/* md:pl-52  */}
      <div className="flex justify-between">
        <p className="text-2xl font-bold text-black font-serif">
          Let's start learning
        </p>
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
        {loading ? (
          <Skeleton height={150} style={{ marginRight: "30px" }} />
        ) : (
          top5.map((item, index) => <LectureCard data={item} key={index} />)
        )}
      </Slider>
    </div>
  );
}

export default StartLearningRow;
