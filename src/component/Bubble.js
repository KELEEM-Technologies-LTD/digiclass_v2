import React from "react";

function Bubble({
  top,
  left,
  height,
  width,
  headerText,
  desc,
  classnames,
  zIndex
}) {
  return (
    <div
      style={{ height, width, top, left, opacity: "0.6",zIndex, }}
      className={`flex-col flex rounded-full justify-center items-center ${classnames} `}
    >
      <p className="font-bold md:text-2xl  text-white">{headerText}</p>
      <p style={{lineHeight:"18.38px",}} className=" text-xs text-white" >{desc}</p>
    </div>
  );
}

export default Bubble;
