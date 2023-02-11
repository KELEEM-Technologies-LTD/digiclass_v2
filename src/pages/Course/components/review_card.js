import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import moment from "moment/moment";
import React from "react";
// import { StarFill } from "../../../assets";

function ReviewCard({ review }) {
  const rating = review.rating;

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Calculate the number of empty stars
  const emptyStars = 5 - Math.ceil(rating);

  // Calculate whether there should be a half star
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-4 my-6 ">
      <div className=" ">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary-700 ">
          <p className="text-white">{review.title[0] + review.description[0]}</p>
        </div>
      </div>
      <div className=" flex flex-col ">
        <p className="font-bold text-lg text-black">{review.title}</p>
        <div className="flex gap-4">
          <div className="flex">
            {[...Array(fullStars)].map((_, i) => (
              <Star width={14} key={i} />
            ))}
            {hasHalfStar && <StarHalf width={14} />}
            {[...Array(emptyStars)].map((_, i) => (
              <StarOutline width={14} key={i} />
            ))}
          </div>
          <p className="">{moment(review.updatedAt).format("Do MMMM YYYY")}</p>
        </div>
        <p className=" leading-8">{review.description}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
