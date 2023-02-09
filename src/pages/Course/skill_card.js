import React from "react";

function SkillCard({ skill }) {
  return (
    <div className="flex justify-center items-center px-8 py-3 bg-primary-300 rounded-full m-2">
      <p>{skill}</p>
    </div>
  );
}

export default SkillCard;
