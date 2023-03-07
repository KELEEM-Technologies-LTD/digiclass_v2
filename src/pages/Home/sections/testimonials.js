import React from "react";
import { Link } from "react-router-dom";
import TestimonialCard from "../../../component/cards/TestimonialCard";

function Community() {
  const isLoggedIn = false;
  return (
    <div className="flex-col flex py-10  md:py-10">
      <>
        <div className="flex-col flex justify-center items-center">
          <p className="font-bold md:text-3xl text-2xl  text-dark">
            From the DigiClass community
          </p>
          <p className="text-lg">
            From the people who are already learning on DigiClass
          </p>
        </div>
        <div className="md:flex md:justify-between md:flex-row flex flex-col md:overflow-x-hidden overflow-x-scroll mt-10  px-6 py-4 md:px-16">
          {[
            {
              name: "John Emil",
              position: "Fullstack developer",
              says: "When potential customers are researching you online, they're getting to know you through the content on your website. So understandably, many of them might be skeptical or hesitant to trust you right away.",
            },
            {
              name: "Uncle Drew",
              position: "Comedy/Sport Analyst",
              says: "After draining his life savings to enter a team in the Rucker Classic street ball tournament in Harlem, Dax is dealt a series of setbacks, including losing his team to his longtime rival. Desperate to win the tournament and the cash prize, Dax stumbles upon the man, the myth, the legend Uncle Drew.",
            },
            {
              name: "Steph Curry",
              position: "Professional basketball player",
              says: "Wardell Stephen Curry II is an American professional basketball player for the Golden State Warriors of the National Basketball Association.",
            },
          ].map((_data, index) => {
            return <TestimonialCard key={index} data={_data} />;
          })}
        </div>
      </>
    </div>
  );
}

export default Community;
