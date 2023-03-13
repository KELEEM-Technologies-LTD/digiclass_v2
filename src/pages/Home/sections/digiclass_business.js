import { Link } from "react-router-dom";

const DigiClassBusiness = () => {
  return (
    <div className="bg-primary-400 py-3">
      <section className="dark:bg-primary-800">
        <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
          <div className="flex items-center justify-center w-full h-96 lg:w-1/2 md:hidden">
            <img
              className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
              src="./img/Digiclassbusiness.jpg"
              alt="glasses photo"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-bold tracking-wide text-primary-800 dark:text-white lg:text-5xl">
                Upskill your team with DigiClass Business
              </h1>

              <div className="mt-8 space-y-5">
                <p className="flex items-center -mx-2 text-primary-700 dark:text-primary-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-secondary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span className="mx-2">
                    <span className="font-bold text-secondary-500">87%</span> of
                    people learning for professional development
                    <span className="font-bold text-secondary-500">
                      {" "}
                      report career benefits
                    </span>{" "}
                    like getting a promotion, a raise, or starting a new career
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full mt-8">
              <Link
                to="/signup"
                target="_blank"
                className="bg-[#2a2b2b] hover:bg-[black] text-[white] font-bold py-4 px-8 mr-4 text-lg"
              >
                Get DigiClass Business
              </Link>
            </div>
          </div>

          <div className="md:flex items-center justify-center w-full h-96 lg:w-1/2 hidden">
            <img
              className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
              src="./img/Digiclassbusiness.jpg"
              alt="glasses photo"
            />
          </div>
        </div>
      </section>

      <section data-purpose="teach-on-digiclass" className="md:px-20 mb-5">
        <div className="md:px-20 px-2">
          <div className="non-student-cta--non-student-cta-content-wrapper--26uBA flex flex-col md:flex-row items-center justify-center">
            <img
              className="w-full md:w-auto md:max-w-md mx-5"
              alt=""
              width="400"
              height="400"
              src="./img/TeachOnDigiClass.png"
            />
            <div className="text-center md:text-justify md:w-1/2">
              <h3
                className="text-3xl font-bold tracking-wide text-[black] dark:text-white lg:text-5xl"
                data-purpose="non-student-cta-title"
              >
                Become an instructor
              </h3>
              <div className="text-xl text-primary-800 font-bold mb-10 pr-20 md:mb-0 w-100">
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
    </div>
  );
};

export default DigiClassBusiness;
