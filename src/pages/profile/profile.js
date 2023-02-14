import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import Footer from "../../component/navigation/footer";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import Notifications from "./sections/notifications";
import PaymentSettings from "./sections/payment";
import ProfileSection from "./sections/profile_settings";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = ["Profile", "Payment", "Notification"];

const Profile = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabindex = searchParams.get("tabindex");
    setSelectedIndex(parseInt(tabindex));
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col font-serif ">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="flex flex-col bg-secondary-600 md:px-16 md:h-52 h-32 px-3 justify-center md:justify-end">
            <div className="flex justify-between items-center">
              <p className=" text-2xl md:text-4xl md:font-bold text-white">
                {tabs[selectedIndex]}
              </p>
            </div>

            <Tab.List className="flex">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "border-primary-100 mr-6 md:px-6 md:py-4 text-white text-lg",
                    selected ? "border-b-2" : ""
                  )
                }
              >
                Profile
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "border-primary-100 mr-6 md:px-6 md:py-4 text-white text-lg",
                    selected ? "border-b-2" : ""
                  )
                }
              >
                Payment
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "border-primary-100 mr-6 md:px-6 md:py-4 text-white text-lg",
                    selected ? "border-b-2" : ""
                  )
                }
              >
                Notification
              </Tab>
            </Tab.List>
          </div>
          <div className="mt-4 md:px-16">
            <Tab.Panels>
              <Tab.Panel>
                <ProfileSection />
              </Tab.Panel>
              <Tab.Panel>
                <PaymentSettings />
              </Tab.Panel>
              <Tab.Panel>
                <Notifications />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
