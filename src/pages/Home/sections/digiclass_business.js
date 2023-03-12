import { Link } from "react-router-dom";

const DigiClassBusiness = () => {
  return (
    <>
      {/* <div className="grid md:grid-cols-2 gap-4 grid-cols-1     py-4 md:px-16 mt-28 flex-col">
        <div className="relative hidden md:block ">
          <div className="absolute top-0 left-0">
            <img src="img/grillbg.svg" alt="bg" />
          </div>

          <div className="relative z-10">
            <img src="img/Digiclassbusiness.jpg" alt="bg" />
          </div>

          <div className="absolute bottom-0 right-0 z-0 ">
            <img src="img/grillbg.svg" alt="bg" />
          </div>
        </div>

        <img
          src="./img/Digiclassbusiness.jpg"
          alt="bg"
          className="block md:hidden w-full"
        />

        <div className="flex flex-col justify-center px-4 py-8 md-py-0 md:px-0">
          <p className="font-bold md:text-3xl text-2xl text-dark">
            Learner outcomes on DigiClass
          </p>
          <div className="mt-2 ">
            <p className="leading-2 md:w-90 md:leading-7 leading-7 text-xl">
              <span className="font-bold text-secondary-500">87%</span> of
              people learning for professional development
              <span className="font-bold text-secondary-500">
                {" "}
                report career benefits
              </span>{" "}
              like getting a promotion, a raise, or starting a new career
            </p>
          </div>
          <Link
            to="/signup"
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-secondary-600 px-10 py-4 text-base font-medium text-white shadow-xl w-10 hover:bg-secondary-800"
          >
            Join Now
          </Link>
        </div>
      </div> */}

      <section className="px-20">
        <div className="max-w-screen-xl mx-auto px-20 py-8 md:py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <img src="./img/loading.gif" alt="DigiClassBusiness" />
            <h2 className="text-[black] text-4xl md:text-5xl font-bold mb-4">
              Upskill your team with DigiClass Business
            </h2>
            <p className="text-[black] text-lg mb-8 md:mb-12">
              <span className="font-bold text-secondary-500">87%</span> of
              people learning for professional development
              <span className="font-bold text-secondary-500">
                {" "}
                report career benefits
              </span>{" "}
              like getting a promotion, a raise, or starting a new career
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                to="/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a2b2b] hover:bg-[black] text-[white] font-bold py-4 px-8 mr-4 text-lg"
              >
                Get DigiClass Business
              </Link>
              <Link
                to="/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-[#cdd0d4] text-[black] font-bold py-4 px-8 text-lg border-2 border-black"
              >
                Learn more
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="img/Digiclassbusiness.jpg"
              alt="Udemy Business"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* <section data-purpose="teach-on-udemy" className="bg-[gray] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[indigo] font-semibold tracking-wide">
              Become an instructor
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[black] sm:text-4xl">
              Teach what you love
            </p>
            <p className="mt-4 max-w-2xl text-xl text-[black] lg:mx-auto">
              Instructors from around the world teach millions of students on
              Udemy. We provide the tools and skills to teach what you love.
            </p>
            <div className="mt-6">
              <Link
                to="/signup"
                className="text-center bg-[indigo] text-white py-3 px-4 rounded-md text-xl font-semibold uppercase tracking-wider inline-block"
              >
                Start teaching today
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <section data-purpose="teach-on-digiclass" className="px-20 mb-5">
        <div className="px-20">
          <div className="non-student-cta--non-student-cta-content-wrapper--26uBA flex flex-col md:flex-row items-center justify-center">
            <img
              className="w-full md:w-auto md:max-w-md mx-5"
              // className="w-64 md:bg-none bg-cover bg-center rounded-lg shadow-lg"
              alt=""
              width="400"
              height="400"
              src="./img/TeachOnDigiClass.jpg"
            />
            <div className="non-student-cta--non-student-cta--2quSb md:w-1/2">
              <h3
                className="text-5xl font-bold md:text-5xl my-5 md:my-0"
                data-purpose="non-student-cta-title"
              >
                Become an instructor
              </h3>
              <div className="text-xl text-[grey] mb-10 pr-20 md:mb-0 w-100">
                Join now to receive personalized recommendations from the full
                DigiClass catalog.
              </div>
              <div className="mt-5">
                <Link
                  to="/signup"
                  className="text-center bg-[black] text-white py-3 px-4 text-xl font-semibold uppercase tracking-wider inline-block"
                >
                  <span>Start teaching today</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigiClassBusiness;
