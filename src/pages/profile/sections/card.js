import { useState } from "react";
import VisaCard from "../../../component/cards/VisaCard";
import InputWithIcon from "../../../component/InputFields/InputWithIcon";

const CardScreen = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-5 grid md:grid-cols-12 md:gap-12 px-5 grid-cols-1  mb-10">
      <div className="flex flex-col gap-4 col-span-4">
        <VisaCard />

        <button
          className="border-dashed px-4 py-6 border-secondary-600 border-2 rounded-5"
          onClick={() => {
            setShow(true);
          }}
        >
          <p>Add New Card</p>
        </button>
      </div>
      {show && (
        <div className="bg-white py-5 px-3 col-span-5 rounded-5 flex flex-col font-serif mb-10">
          <form className={` px-3 py-2`}>
            <div className="">
              <p className="text-sm my-3">Card Holder</p>

              <InputWithIcon
                icon1="./img/person.svg"
                placeholder="Full name"
                type="text"
                name="cardHolder"
                required
                className=" border-primary-500 text-black border rounded-5 w-full  flex py-5 bg-primary-100  justify-between"
              />
            </div>

            <div className="mt-4">
              <p className="my-3 text-sm">Card Number</p>

              <InputWithIcon
                required
                type="text"
                minLength="16"
                maxLength="16"
                icon1="./img/creditcard.svg"
                placeholder="Card Number"
                name="cardNumber"
                className=" border-primary-500 text-black border rounded-5 w-full  flex py-5 bg-primary-100  justify-between"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="">
                <p className="my-3 text-sm">CVV</p>

                <InputWithIcon
                  required
                  icon1="./img/cvv.svg"
                  placeholder="CVV"
                  type="text"
                  name="cvv"
                  maxLength="3"
                  minLength="3"
                  className=" border-primary-500 border text-black rounded-5 w-full  flex py-5 bg-primary-100  justify-between"
                />
              </div>
              <div className="">
                <p className="my-3 text-sm">Expiry Date</p>

                <InputWithIcon
                  required
                  icon1="./img/calendar.svg"
                  placeholder="Expiry eg. 09/21"
                  type="text"
                  name="exp"
                  maxLength="5"
                  minLength="5"
                  className=" border-primary-500 border rounded-5 w-full text-black flex py-5 bg-primary-100  justify-between"
                />
              </div>
            </div>
            <div className="flex justify-end mt-7">
              <div className="flex gap-5">
                <button
                  size="big"
                  className="outlineLg rounded-5"
                  type="button"
                  onClick={() => setShow(false)}
                >
                  <p className="text-lg text-red">Cancel</p>
                </button>
                <button
                  className="outlineLg py-2 px-6 bg-secondary-600"
                  type="submit"
                >
                  <p className="text-white text-lg">Save</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CardScreen;
