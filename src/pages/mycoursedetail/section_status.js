import localforage from "localforage";
import { useEffect, useLayoutEffect, useState } from "react";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";

const SectionStatus = ({ sectionid, courseid }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {}, []);

  const handleChecked = async () => {
    // console.log(courseid);
    // console.log(sectionid);

    const user = await localforage.getItem("userdata");
    try {
      const res = await (
        await Services()
      ).put(
        global_variables().updateSection +
          `/${user.user_id}/${courseid}/${sectionid}`
      );

      // console.log(res);
      setChecked(!checked);
    } catch (err) {}
  };

  const getStatus = async () => {
    const user = await localforage.getItem("userdata");
    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getSectionStatus + `/${user.user_id}/${sectionid}`
      );

      // console.log(res.data?.payload);
      if (res.data?.payload?.length === 0) {
        setChecked(false);
      } else {
        setChecked(true);
      }
    } catch (err) {}
  };

  useLayoutEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      <label className="relative inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          //   value={checked}
          className="sr-only peer"
          onChange={handleChecked}
          checked={checked}
        />
        <div className="w-9 h-5 bg-primary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-300 dark:peer-focus:ring-secondary-800 rounded-full peer dark:bg-primary-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-primary-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-primary-600 peer-checked:bg-secondary-600"></div>
        <span className="ml-3 text-sm font-medium text-primary-900 dark:text-primary-300">
          {checked ? <>Completeted</> : <>Mark as completed</>}
        </span>
      </label>
    </>
  );
};

export default SectionStatus;
