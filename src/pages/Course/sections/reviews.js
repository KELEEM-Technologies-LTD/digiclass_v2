import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";
import ReviewCard from "./review_card";

const Reviews = (props) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([])

  const getReviews = async () => {
    setLoading(true);

    try {
      const res = await (
        await Services()
      ).get(global_variables().getReviews + `?course_id=${props.courseid}`);
      console.log(res.data?.data);
      setReviews(res.data?.data?.data)
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
    {
        loading
        ?
      <div>
        <Skeleton
          height={50}
          className="mb-3"
          width={50}
          style={{ borderRadius: "100%" }}
        />
        <Skeleton count={4} />
      </div>
      :
      reviews.map((d,index)=>{
        return <ReviewCard key={index} review={d} />
      })
    }
    </>
  );
};

export default Reviews;
