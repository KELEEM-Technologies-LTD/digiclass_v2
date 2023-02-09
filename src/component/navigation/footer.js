import React from "react";
import logo from './../../assets/svgs/logo.svg'

const row1 = [
  {
    text: "DigiClass foe Business",
  },
  {
    text: "Teach on DigiClass",
  },
  {
    text: "Get the app",
  },
  {
    text: "About us",
  },
  {
    text: "Contact Us",
  },
];

const row2 = [
  {
    text: "Careers",
  },
  {
    text: "Blog",
  },
  {
    text: "Help and Support",
  },
  {
    text: "Affiliate",
  },
];

const row3 = [
  {
    text: "Terms",
  },
  {
    text: "Privacy Policy",
  },
  {
    text: "Sitemap",
  },
  {
    text: "Featred courses",
  },
];

function Footer() {
  return (
    <div className="w-full px-6 py-28 md:px-16 md:bg-white bg-primary-200">
      <div className="md:flex md:justify-between md:flex-row  flex-col">
        <div className="flex-col flex md:mt-0 mt-4 ">
          <ul>
            {row1.map((item, index) => (
              <li className=" mt-2 cursor-pointer" key={index}>
                <p className="text-lg">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-col flex md:mt-0 mt-4">
          <ul>
            {row2.map((item, index) => ( 
              <li className="mt-2 cursor-pointer" key={index} >
                <p className="text-lg">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-col flex md:mt-0 mt-4">
          <ul>
            {row3.map((item, index) => (
              <li className="mt-2" key={index}>
                <p className="text-lg">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <img src={logo} alt="logo" className="mt-12" />
    </div>
  );
}

export default Footer;
