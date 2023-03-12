import localforage from "localforage";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

const is_course_complete = async (course_id) => {
  const user = await localforage.getItem("userdata");
  try {
    const allsections = await (
      await Services()
    ).get(
      global_variables().getCourses + `/${course_id}/users/${user.user_id}`
    );
    const allcompletesection = await (
      await Services()
    ).get(
      global_variables().getAllCompletedSections +
        `/${user.user_id}/${course_id}`
    );

    const len_sec = allsections.data?.data?.sections?.length;
    const com_sec = allcompletesection.data?.payload?.length;
    const per = com_sec / len_sec;

    if (per < 1) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
};

export default is_course_complete;
