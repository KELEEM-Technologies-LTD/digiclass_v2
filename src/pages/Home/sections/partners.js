import React from "react";
const logos = [
  "./img/partners/1.png",
  "./img/partners/2.png",
  "./img/partners/3.png",
  "./img/partners/4.png",
  "./img/partners/5.png",
  "./img/partners/6.png",
  "./img/partners/7.png",
  "./img/partners/8.png",
];

function Partners() {
  return (
    <div className="flex flex-col">
      <div className="px-6 py-2 md:px-16">
        <p>
          WE COLLABORATE WITH OVER{" "}
          <span className="text-secondary-900">150+</span> Affiliated
          Universities & Institutions
        </p>
      </div>
      <div className="bg-primary-100 items-center">
        {/* <span>
          <i className="fa fa-chevron-left text-3xl"></i>
        </span> */}
        <div className="flex justify-between px-6 py-2 md:px-16 md:overflow-x-hidden overflow-x-scroll">
          {logos.map((item, index) => (
            <img src={item} alt={index} key={index} />
          ))}
        </div>
        {/* <span>
          <i className="fa fa-chevron-right text-3xl"></i>
        </span> */}
      </div>
    </div>
  );
}

export default Partners;
