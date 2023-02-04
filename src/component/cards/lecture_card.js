import React from "react";
import { Link } from "react-router-dom";

function LectureCard({ data }) {
  const { title, image } = data;
  return (
    <Link
      to="/course"
      className="flex gap-3 h-32 mr-4 rounded-5 "
      style={{ border: "1px solid #787878" }}
    >
      <div
        className="bg-no-repeat w-full relative"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      >
        <div className="absolute w-full h-full opacity-75 bg-black flex justify-center items-center">
          <button>
            <img src="./img/play.png" className="w-12" alt="play" />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between px-2 py-2">
        <p className="font-serif text-sm font-bold text-black">{title}</p>
        <div className="flex gap-3">
          <p className="font-serif text-sm">Lecture</p>
          <p className="font-serif text-sm">30m</p>
        </div>
      </div>
    </Link>
  );
}

export default LectureCard;
