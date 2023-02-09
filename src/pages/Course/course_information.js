import { useContext} from "react";
import AboutAuthor from "./about_the_author";
import SkillCard from "./skill_card";
import "react-loading-skeleton/dist/skeleton.css";
import Reviews from "./sections/reviews";
import GeneralContext from "./../../context/general_context";
import { Link } from "react-router-dom";

const CourseInformation = (props) => {
  const { isLogged } = useContext(GeneralContext);

  return (
    <>
      <div className="grid md:grid-cols-12 grid-cols-1">
        <div className="col-span-9">
          <div className="md:px-24 px-4 py-4">
            <div className="py-8">
              <p className="text-2xl font-bold text-black">About this course</p>
              <p className="text-lg">{props.about}</p>
            </div>
            <hr />

            <div className="py-8 flex md:flex-row flex-col md:justify-between">
              <p className="text-lg">By the numbers</p>
              <div className="mt-4">
                <ul>
                  <li>
                    <p className="text-lg">Skill level: Beginner Level</p>
                  </li>
                  <li>
                    <p className="text-lg">Students: 29161</p>
                  </li>
                  <li>
                    <p className="text-lg">Languages: English</p>
                  </li>
                  <li>
                    <p className="text-lg">Captions: Yes</p>
                  </li>
                </ul>
                <p></p>
              </div>
              <div className="mt-4">
                <ul>
                  <li>
                    <p className="text-lg">Lectures: 50</p>
                  </li>
                  <li>
                    <p className="text-lg">Video: 7 total hours</p>
                  </li>
                </ul>
                <p></p>
              </div>
            </div>
            <hr />

            <div className="py-8 flex md:flex-row flex-col md:justify-between">
              <p className="text-lg">By the numbers</p>
              <div className="mt-4 md:w-2/4 w-full">
                <p className="text-lg">
                  This course will teach you what you need to know in order to
                  make a 2D sprite based game in Unity editor version 5.6
                  (Latest Beta version at this time). The techniques used in
                  this series are the same ones I used to make my own game Heart
                  Battle for PC and mobile devices. Currently the course in in
                  progress, it will be completed in the coming month and should
                  be updated from time to time with new relevant content after
                  that as well. The rough finished course list should look
                  something like this when done.
                </p>
              </div>
            </div>
            <hr />

            <div className="py-8 flex md:flex-row flex-col md:justify-between">
              <p className="text-lg">Certificates</p>
              <div className="">
                <p>get Digiclass certificate by completing entire course</p>
                <button
                  //   onClick={() => history.push("/certificate")}
                  className="border border-secondary-600 px-6 py-2 mt-6 rounded-5"
                >
                  <p>Digiclass certificate</p>
                </button>
              </div>
            </div>
            <hr />

            <div className="py-8 flex md:flex-row flex-col md:justify-between">
              <p className="text-lg">Skills you will gain</p>
              <div className="mt-10 flex flex-wrap justify-evenly">
                {/* {skills.map((skill) => ( */}
                <SkillCard skill={"skill"} />
                {/* // ))} */}
              </div>
            </div>

            <hr />

            {/* <RatingSection /> */}
            <div className="py-8 item-center md:px-36 px-6 flex flex-col justify-center">
              <p className="text-secondary-600 font-bold my-4 text-lg">
                Reviews
              </p>
              {isLogged ? (
                <Reviews courseid={props.courseid} />
              ) : (
                <p>
                  Please <Link to="/login" className="text-secondary-500">log in</Link> to view reviews on the
                  course
                </p>
              )}
            </div>

            <AboutAuthor />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseInformation;
