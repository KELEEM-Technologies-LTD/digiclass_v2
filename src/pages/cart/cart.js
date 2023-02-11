import localforage from "localforage";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../../component/navigation/footer";
import GeneralContext from "../../context/general_context";
import NavigationBar from "./../../component/navigation/public_navigation_bar";

const Cart = () => {

  const actions = ["My Course", "Payment methods", "Privacy", "Notification"];
  const [selectedTab, setSeletedTab] = useState("My Course");
  const handleSelectedTab = (tab) => {
    setSeletedTab(tab);
  };

    return (
      <>
        <NavigationBar />
        <div className="flex flex-col">
          {/* header with tabs */}
          <div className="flex flex-col bg-secondary-600 md:px-16 md:h-52 h-32 px-3 justify-center md:justify-end">
            <div className="flex justify-between items-center">
              <p className=" text-2xl md:text-4xl md:font-bold text-white">
                Shopping Cart
              </p>
              <div className="flex flex-col md:hidden">
                <p className="text-white">Total</p>
                <p className=" font-bold text-white text-2xl">GHS 25.00</p>
              </div>
            </div>

            <div className="hidden md:flex justify-between md:mt-8">
              <div>
                {actions.slice(0, 1).map((item) => (
                  <button
                    onClick={() => handleSelectedTab(item)}
                    className={`border-primary-100 mr-6 py-2 ${
                      selectedTab === item ? "border-b-2" : ""
                    }`}
                  >
                    <p className="text-white">{item}</p>
                  </button>
                ))}
              </div>
              <div className="flex">
                {actions.slice(1, 4).map((item) => (
                  <button
                    onClick={() => handleSelectedTab(item)}
                    className={`border-primary-100 mr-6 py-2 ${
                      selectedTab === item ? "border-b-2" : ""
                    }`}
                  >
                    <p className="text-white">{item}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
};

export default Cart;
