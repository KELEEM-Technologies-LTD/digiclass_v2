import { useState } from "react";
import MomoCard from "../../../component/cards/MomoCard";
import DropDownComponent from "../../../component/InputFields/DropDownComponent";
import InputWithIcon from "../../../component/InputFields/InputWithIcon";

const MobileMoney = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="mt-5 grid md:grid-cols-12 md:gap-12 px-5 grid-cols-1">
        <div className="flex flex-col gap-4 col-span-4">
          <MomoCard />
          <button
            className=" border-dashed px-4 py-6 border-secondary-600 border-2 rounded-5"
            onClick={() => {
              setShow(true);
            }}
          >
            <p>Add New Card</p>
          </button>
        </div>
        {show && (
          <div className="bg-white py-5 px-3 col-span-4 rounded-5 flex flex-col font-serif">
            <form>
              <div className="">
                <p className="text-sm my-3">Accoun Holder</p>

                <InputWithIcon
                  icon1="./img/person.svg"
                  placeholder="Accoun Holder"
                  type="text"
                  required
                  name="accountHolder"
                  className=" border-primary-500 border text-black rounded-5 w-full  flex py-5 bg-primary-100  justify-between"
                />
              </div>

              <div className="mt-4">
                <p className="my-3 text-sm">Account Number</p>

                <InputWithIcon
                  name="accountNumber"
                  icon1="./img/phone.svg"
                  placeholder="Account Number"
                  type="text"
                  required
                  className=" border-primary-500 text-black border rounded-5 w-full  flex py-5 bg-primary-100  justify-between"
                />
              </div>
              <div className="mt-4">
                <DropDownComponent
                  name="network"
                  items={["MTN", "AIRTELTIGO", "VODAFONE"]}
                  label="Network Provider"
                  className="w-full  border-primary-500 py-5 border"
                  required
                />
              </div>
              <div className="flex justify-between mt-7">
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
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMoney;
