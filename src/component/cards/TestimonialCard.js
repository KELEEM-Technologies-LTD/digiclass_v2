import React from "react";

function TestimonialCard() {
  return (
    <div className=" flex-grow md:w-80  md:flex-grow-0 flex flex-col items-center rounded-5 py-24 px-4 testimonial-card">
      <div className="flex flex-col justify-center items-center">
        <img src="./img/guy.png" alt="testimonial" className="rounded-full h-14 w-14" />
        <p className="font-bold md:text-sm mt-3  text-dark uppercase">Mark Hower</p>
        <p className="text-sm">Web Developer</p>
      </div>
      <div className="mt-3">
        <blockquote>
          <p className=" text-center text-lg md:leading-8">
            “Tailwind CSS is the only framework that I've seen scale on large
            teams. It’s easy to customize, adapts to any design, and the build
            size is tiny.”
          </p>
        </blockquote>
      </div>
    </div>
  );
}

export default TestimonialCard;
