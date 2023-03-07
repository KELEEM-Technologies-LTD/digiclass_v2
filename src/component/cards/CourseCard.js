import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralContext from "../../context/general_context";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import InstructorName from "../../pages/mycourses/get_instructor_name";
import { formatCedis } from "../Helpers/money";

function CourseCard({ showProgress, item }) {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const { thumbnail, title, course_id, price, instructor } = item;
  const { isLogged } = useContext(GeneralContext);

  const getReviews = async () => {
    setLoading(true);
    if (isLogged) {
      try {
        const res = await (
          await Services()
        ).get(global_variables().getReviews + `?course_id=${course_id}`);

        const data = res.data?.data?.data;
        const sum = data.reduce((acc, item) => acc + item.rating, 0);

        if (sum === 0) {
          setRating(5);
          setLoading(false);
        } else {
          const mean = sum / data.length;
          setLoading(false);
          setRating(mean);
        }
      } catch (err) {}
    }
  };

  useEffect(() => {
    getReviews();
    // console.log(item);
  }, []);

  const navigate = useNavigate();

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Calculate the number of empty stars
  const emptyStars = 5 - Math.ceil(rating);

  // Calculate whether there should be a half star
  const hasHalfStar = rating % 1 !== 0;

  return (
    <>
      <div
        onClick={() => navigate(`/course/${course_id}`)}
        className="cursor-pointer flex flex-col rounded-md overflow-hidden shadow-md "
      >
        <div className="h-40">
          <img
            className="object-cover w-full h-full"
            src={thumbnail}
            alt={thumbnail}
          />
        </div>
        <div className="p-4 flex-grow">
          <h2 className="text-lg font-medium mb-2">{title}</h2>
          <p className="text-primary-600 text-sm mb-2">
            {isLogged ? <InstructorName instructor={instructor} /> : null}
          </p>
          <div className="flex items-center mb-2">
            {[...Array(fullStars)].map((_, i) => (
              // <Star width={14} key={i} />
              <i className="fa fa-star text-secondary-500 text-sm" key={i}></i>
            ))}
            {hasHalfStar && (
              <i className="fa fa-star-half-alt text-secondary-500 text-sm"></i>
            )}
            {[...Array(emptyStars)].map((_, i) => (
              <i className="far fa-star text-secondary-500 text-sm" key={i}></i>
            ))}
            <p className="text-primary-600 text-sm">({rating.toFixed(1)})</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-green-500">
              {formatCedis(price)}
            </p>
            <p className="text-primary-600 text-sm line-through">
              {formatCedis(price * 1.35)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseCard;

// <div
// onClick={() => navigate(`/course/${course_id}`)}
// className=" cursor-pointer md:shadow-outlineLg course-card flex md:flex-col mr-1 md:bg-white rounded-5 hover:border-secondary-500 mb-5"
// >
// <img src={thumbnail} alt="courseimage" className="w-36 md:w-full" />
// <div className="p-3 md:bg-white ">
//   <p className="md:text-lg text-sm font-bold">{title}</p>
//   {!showProgress ? (
//     <div className="flex md:flex-col flex-col-reverse ">
//       <div className="flex justify-between mt-5">
//         <p className=" font-bold text-sm"> {formatCedis(price)}</p>
//         {/* <p className=" text-sm line-through">GHS 13.99</p> */}
//       </div>
//       {!loading && (
//         <div className="flex ">
//           <p className="font-bold text-sm text-secondary-500 ">
//             {rating.toFixed(1)}
//           </p>
//           <div className="flex justify-between items-center ml-1">
//             {[...Array(fullStars)].map((_, i) => (
//               // <Star width={14} key={i} />
//               <i
//                 className="fa fa-star text-secondary-500 text-sm"
//                 key={i}
//               ></i>
//             ))}
//             {hasHalfStar && (
//               <i className="fa fa-star-half-alt text-secondary-500 text-sm"></i>
//             )}
//             {[...Array(emptyStars)].map((_, i) => (
//               <i
//                 className="far fa-star text-secondary-500 text-sm"
//                 key={i}
//               ></i>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   ) : (
//     <div className="flex gap-2 items-center mt-12">
//       <img src="./img/smallplay.svg" alt="playicon" />
//       <p className="text-secondary-700">0/50</p>
//       <p className="text-secondary-700">Complete</p>
//     </div>
//   )}
// </div>
// </div>
