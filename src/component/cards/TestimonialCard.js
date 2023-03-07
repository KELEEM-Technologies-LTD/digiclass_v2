import React from "react";

function TestimonialCard({ data }) {
  return (
    <div className=" flex-grow md:w-80  md:flex-grow-0 flex flex-col items-center rounded-5 py-10 px-4 testimonial-card">
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold md:text-sm mt-3  text-dark uppercase">
          {data?.name}
        </p>
        <p className="text-sm">{data?.position}</p>
      </div>
      <div className="mt-3">
        <blockquote>
          <p className=" text-center text-lg md:leading-8">“{data?.says}”</p>
        </blockquote>
      </div>
    </div>
  );
}

export default TestimonialCard;
