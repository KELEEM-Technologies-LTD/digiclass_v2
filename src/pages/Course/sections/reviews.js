import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  displayErrMsg,
  displaySuccMsg,
  displayWarningMsg,
} from "../../../component/alerts/alerts";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";
import ReviewCard from "../components/review_card";

const Reviews = ({ reviews, courseid, reload, loading }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [posting, setPosting] = useState(false);

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const postReview = async (e) => {
    e.preventDefault();
    setPosting(true);

    const reviewData = {
      title: title,
      description: message,
      course_id: courseid,
      rating: rating,
    };

    if (rating === 0) {
      displayWarningMsg("Please select a rating");
    } else {
      try {
        const res = await (
          await Services()
        ).post(global_variables().postReviews, reviewData);

        setPosting(false);
        setMessage("");
        setTitle("");
        // console.log(res.data);
        reload();
        displaySuccMsg(
          res.data?.status + " Review posted successfully",
          () => {}
        );
      } catch (err) {
        // console.log(err);
        setPosting(false);
        displayErrMsg("Error posting course review", () => {});
      }
    }

    // console.log(reviewData);
  };

  return (
    <>
      {loading ? (
        <div>
          <Skeleton
            height={50}
            className="mb-3"
            width={50}
            style={{ borderRadius: "100%" }}
          />
          <Skeleton count={4} />
        </div>
      ) : reviews.length === 0 ? (
        <p>There are no reviews for this coures</p>
      ) : (
        reviews.map((d, index) => {
          return <ReviewCard key={index} review={d} />;
        })
      )}

      <hr className="mt-10 border-secondary-400" />
      <form onSubmit={postReview}>
        <p className="text-secondary-600 font-bold text-lg mt-7">
          Add a review
        </p>

        <div className="flex">
          <p></p>
          <div className="rating">
            <input
              type="radio"
              name="rating"
              value="5"
              id="5"
              onChange={handleRating}
            />
            <label htmlFor="5">☆</label>
            <input
              type="radio"
              name="rating"
              value="4"
              id="4"
              onChange={handleRating}
            />
            <label htmlFor="4">☆</label>
            <input
              type="radio"
              name="rating"
              value="3"
              id="3"
              onChange={handleRating}
            />
            <label htmlFor="3">☆</label>
            <input
              type="radio"
              name="rating"
              value="2"
              id="2"
              onChange={handleRating}
            />
            <label htmlFor="2">☆</label>
            <input
              type="radio"
              name="rating"
              value="1"
              id="1"
              onChange={handleRating}
            />
            <label htmlFor="1">☆</label>
          </div>
        </div>
        <div className="mb-7">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-primary-900 dark:text-primary-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-primary-50 border border-primary-300 text-primary-900 text-sm rounded-lg focus:ring-secondary-500 focus:border-secondary-500 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-secondary-500 dark:focus:border-secondary-500"
            placeholder="Review title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-primary-900 dark:text-primary-400"
          >
            Leave a message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-primary-900 bg-primary-100 rounded-lg border border-primary-300 focus:ring-secondary-400 focus:border-secondary-400 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-secondary-400 dark:focus:border-secondary-400"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="text-end mt-7">
          <button
            className="rounded-2 border border-transparent bg-secondary-600 px-8 py-2 text-base font-medium text-white shadow-xl hover:bg-secondary-800"
            disabled={posting}
          >
            {posting ? (
              <div className="flex justify-center items-center">
                <div className="w-8 h-8 border-2 border-primary-800 rounded-full border-t-2 border-t-secondary-500 animate-spin"></div>
              </div>
            ) : (
              "Post Review"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Reviews;
