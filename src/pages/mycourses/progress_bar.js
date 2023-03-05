import React from "react";

const ProgressBar = ({ total, completed }) => {
  const percentage = Math.floor((completed / total) * 100);

  return (
    <div className="relative mt-2 pt-1">
      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-primary-200">
        <div
          style={{ width: `${percentage ? percentage : 0}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary-500"
        />
      </div>
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-primary-600 bg-primary-200">
            Progress
          </span>
        </div>
        <div className="text-xs font-semibold inline-block text-primary-600">
          {percentage ? percentage : 0}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
