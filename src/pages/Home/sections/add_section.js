import { Link } from "react-router-dom";

const AddSection = () => {
  return (
    <div className="md:flex md:justify-between md:flex-row-reverse  py-4 md:px-16  md:mt-4 flex-col">
      <div className="hidden md:block">
        <div className="">
          <img src="./img/ad.png" alt="bg" className="" />
        </div>
      </div>

      <div className="block md:hidden relative">
        <div className="relative w-full">
          <img
            src="./img/addfull.png"
            alt="bg"
            className="block md:hidden w-full"
          />
        </div>
        {/* <div className="absolute bottom-0 w-full  flex justify-center items-center ">
          <button
            size="big"
            className="outlineLg  px-16 m-4 py-5"
            color={"secondary"}
          >
            <p className="text-white">Call to Action</p>
          </button>
          <Link
            to="#"
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-secondary-600 px-4 py-2 text-base font-medium text-white shadow-xl hover:bg-secondary-800"
          >
            Call to Action
          </Link>
        </div> */}
      </div>

      <div className="flex-col justify-center px-4 py-8 md-py-0 md:px-0  hidden md:block md:flex">
        <p className="font-bold md:text-3xl text-3xl md:w-96 text-dark">
          Your Ad goes here, can also be a slider
        </p>
        <div className="mt-2 ">
          <p className="leading-2" style={{ width: "340px" }}>
            Get courses from GHC 15.99 and stay ahead.
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
  );
};

export default AddSection;
