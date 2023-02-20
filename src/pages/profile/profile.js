import { Tab } from "@headlessui/react";
import localforage from "localforage";
import { useEffect, useState } from "react";
import Footer from "../../component/navigation/footer";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import Notifications from "./sections/notifications";
import PaymentSettings from "./sections/payment";
import ProfileSection from "./sections/profile_settings";
import { HashLoader } from "react-spinners";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = ["Profile", "Payment", "Notification"];

const Profile = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabindex = searchParams.get("tabindex");
    setSelectedIndex(parseInt(tabindex));
    getUserInformation();
  }, []);

  const getUserInformation = async () => {
    setLoading(true);
    const userdata = await localforage.getItem("userdata");
    try {
      const res = await (
        await Services()
      ).get(global_variables().getUser + `/${userdata.user_id}`);
      // console.log(res.data?.data);
      setUser(res.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      localforage.clear().then(() => {
        window.location.href = "/login";
      });
    }
  };

  return loading ? (
    <div
      className="flex justify-center items-center mt-5"
      style={{ marginBottom: "10vh" }}
    >
      <HashLoader
        color="#4080ff"
        loading={true}
        size={100}
        onClick={() => {
          setLoading(false);
        }}
      />
    </div>
  ) : (
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
                <ProfileSection
                  user={user}
                  getUserInformation={getUserInformation}
                />
              </Tab.Panel>
              <Tab.Panel>
                <PaymentSettings user={user} />
              </Tab.Panel>
              <Tab.Panel>
                <Notifications user={user} />
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
