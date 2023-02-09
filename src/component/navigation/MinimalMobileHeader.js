import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "../../assets";

function MinimalMobileHeader({ title }) {
  const navigate = useNavigate();
  return (
    <div className="md:hidden bg-secondary-600 w-full py-6 px-4 flex gap-3">
      <button onClick={()=>{navigate(-1)}}>
        <ChevronLeft />
      </button>
      <p className="text-white text-lg">{title}</p>
    </div>
  );
}

export default MinimalMobileHeader;
