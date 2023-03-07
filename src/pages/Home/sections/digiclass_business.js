import { Link } from "react-router-dom";

const DigiClassBusiness = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1     py-4 md:px-16 mt-28 flex-col">
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
      </div>
    </>
  );
};

export default DigiClassBusiness;
