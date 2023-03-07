import { Link } from "react-router-dom";

const JoinDigiClass = () => {
  return (
    <>
      <div className="md:flex md:justify-between md:flex-row-reverse bg-[white] py-4 md:px-16 mt-10 flex-col">
        <div className="relative hidden md:block ">
          <div className="absolute top-0 left-0">
            <img src="./img/grillbg.svg" alt="bg" />
          </div>

          <div className="relative z-10">
            <img src="./img/TeachOnDigiClass.png" alt="bg" className="w-64" />
          </div>

          <div className="absolute bottom-0 right-0 z-0 ">
            <img src="./img/grillbg.svg" alt="bg" />
          </div>
        </div>

        <div className="block md:hidden">
          <div className="relative w-full">
            <img
              src="./img/TeachOnDigiClass.jpg"
              alt="bg"
              className="block md:hidden w-full"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center px-4 py-8 md-py-0 md:px-0">
          <p className="font-bold md:text-3xl text-2xl md:w-8/12 text-dark">
            Take the next step toward your personal and professional goals with
            DigiClass.
          </p>
          <div className="mt-2 ">
            <p className="leading-2 text-2xl md:w-7/12">
              Join now to receive personalized recommendations from the full
              DigiClass catalog.
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

export default JoinDigiClass;
