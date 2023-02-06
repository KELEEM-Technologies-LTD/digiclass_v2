import React from "react";

function HorizontalRule({ className }) {
  return (
    <div
      style={{ height: "1.4px" }}
      className={` ${className} my-4 bg-primary-300`}
    />
  );
}

export default HorizontalRule;
