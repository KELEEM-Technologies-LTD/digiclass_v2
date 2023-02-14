import React from "react";
import { getNetworkLogo } from "../Helpers/getNetworkLogo";

function MomoCard() {
  const selected = true;

  return (
    <div
      className={`${
        selected ? " border-4 border-white" : ""
      } px-4 py-8 rounded-8 flex flex-col justify-between cursor-pointer`}
      style={{ backgroundColor: "#0074a0" }}
    >
      <div className="flex justify-end">
        <img src={getNetworkLogo("VODAFONE")} width={50} alt={"mtn"} />
      </div>
      <div>
        <p className="text-xl text-white">+233204920230</p>
      </div>
      <div className="px-3 flex justify-between mt-6 ">
        <div>
          <p className="font-thin text-white font-sans ">Account Holder</p>
          <p className="font-bold text-white">John Emil</p>
        </div>
      </div>
    </div>
  );
}

export default MomoCard;
