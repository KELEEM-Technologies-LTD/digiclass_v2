import { Tab } from "@headlessui/react";
import CardScreen from "./card";
import MobileMoney from "./momo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PaymentSettings = () => {
  const tabs = ["Card", "Mobile Money"];

  return (
    <>
      <Tab.Group>
        <div className="flex flex-col font-serif ">
          <Tab.List>
            <div className="grid grid-cols-2 mt-4">
              <div className="col-span-1 flex">
                {tabs.map((data, index) => {
                  return (
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "py-5 px-12",
                          selected ? "border-b-2  border-secondary-600" : ""
                        )
                      }
                      key={data + index}
                    >
                      {data}
                    </Tab>
                  );
                })}
                <hr />
              </div>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <CardScreen />
            </Tab.Panel>
            <Tab.Panel>
              <MobileMoney />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </>
  );
};

export default PaymentSettings;
