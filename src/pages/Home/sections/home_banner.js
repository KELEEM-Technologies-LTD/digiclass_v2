import { useContext } from "react";
import InputWithIcon from "../../../component/InputFields/InputWithIcon";
import GeneralContext from "../../../context/general_context";
import SearchHomeBanner from "./search_course_on_banner";

const HomeBanner = () => {
  const { isLogged, user } = useContext(GeneralContext);

  return (
    <div className=" md:h-screen  md:px-16 grid md:grid-cols-2 grid-cols-1 items-center">
      <img src="./img/2.png" alt="people" className="md:hidden w-full" />

      <div className="flex flex-col justify-center md:px-0 md:mt-0 mt-4 px-5   ">
        <div className="">
          <p
            className={`text-3xl font-bold tracking-wide text-primary-800 dark:text-white lg:text-5xl ${
              isLogged ? "font-serif" : ""
            }`}
            style={{ lineHeight: "1.2em" }}
          >
            {isLogged
              ? `Hi ${user.first_name}, you can start learning today`
              : "Anyone, anywhere, at anytime can learn to become"}
          </p>

          <p className={`md:mt-4 mt-2 text-xl ${isLogged ? "font-serif" : ""}`}>
            {isLogged
              ? "Get courses from GHC 15.99 and stay ahead"
              : "Anywhere anytime. Enjoy Learning"}
          </p>
          {/* {!isLogged ?  */}
          <SearchHomeBanner />
          {/* : null} */}
        </div>
      </div>

      <div className="hidden md:block relative">
        {/* {isLogged ? (
          <>
            <div className="absolute top-0 left-0">
              <img src="img/grillbg.svg" alt="bg" />
            </div>

            <div className="relative z-0 left-10">
              <img src="img/guy2.png" alt="bg" />
            </div>

            <div className="absolute bottom-0 right-0 z-0 ">
              <img src="img/grillbg.svg" alt="bg" />
            </div>
          </>
        ) : (
            )} */}
        <>
          <div className="absolute top-0 left-0">
            <img src="img/grillbg.svg" alt="bg" />
          </div>

          <div className="relative z-10">
            <img src="img/1.png" alt="bg" />
          </div>

          <div className="absolute bottom-0 right-0 z-0 ">
            <img src="img/grillbg.svg" alt="bg" />
          </div>
        </>
      </div>
    </div>
  );
};

export default HomeBanner;
