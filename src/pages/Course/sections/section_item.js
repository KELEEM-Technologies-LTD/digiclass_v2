import { Checkbox } from "@mui/material";
import React from "react";

function SectionItem({ item }) {
  const { title, duration } = item;
  return (
    <div className="flex mb-3 justify-between px-2">
      <div className="flex">
        <Checkbox />
        <div className="flex flex-col">
          <p className="text-lg">{title}</p>
          <div className="flex ">
            <img src="../img/smallplay.svg" alt="icon-play" />
            <p className="ml-2 text-lg">{duration}</p>
          </div>
        </div>
      </div>
      <img src="../img/lock.svg" alt="icon-lock"  />
    </div>
  );
}

export default SectionItem;
