import React from "react";
import TestimonialCard from "../../../component/cards/TestimonialCard";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const testimo = [
  {
    name: "John Emil",
    position: "Fullstack developer",
    says: "When potential customers are researching you online.",
  },
  {
    name: "Uncle Drew",
    position: "Comedy/Sport Analyst",
    says: "After draining his life savings to enter a team in the Rucker Classic",
  },
  {
    name: "Steph Curry",
    position: "Professional basketball player",
    says: "Wardell Stephen Curry II is an American professional.",
  },
];

function Community() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimo.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimo.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex-col flex py-5  md:py-5">
      <>
        <div className="flex-col flex justify-center items-center">
          <p className="font-bold md:text-3xl text-2xl  text-dark">
            From the DigiClass community
          </p>
          <p className="text-lg">
            From the people who are already learning on DigiClass
          </p>
        </div>
        <div className="md:flex md:justify-between md:flex-row flex flex-col md:overflow-x-hidden overflow-x-scroll mt-10  px-6 py-4 md:px-16 hidden">
          {testimo.map((_data, index) => {
            return <TestimonialCard key={index} data={_data} />;
          })}
        </div>
        <div className="flex md:hidden px-6 py-4 items-center justify-center">
          <ArrowLeft
            className="text-gray-600 cursor-pointer"
            onClick={handlePrev}
          />
          <div className="flex-grow md:w-80 md:flex-grow-0 flex flex-col items-center rounded-5 py-2 px-4 testimonial-card">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold md:text-sm mt-3 text-dark uppercase">
                {testimo[currentIndex]?.name}
              </p>
              <p className="text-sm">{testimo[currentIndex]?.position}</p>
            </div>
            <div className="mt-3">
              <blockquote>
                <p className="text-center text-lg md:leading-8">
                  “{testimo[currentIndex]?.says}”
                </p>
              </blockquote>
            </div>
          </div>
          <ArrowRight
            className="text-gray-600 cursor-pointer"
            onClick={handleNext}
          />
        </div>
      </>
    </div>
  );
}

export default Community;
