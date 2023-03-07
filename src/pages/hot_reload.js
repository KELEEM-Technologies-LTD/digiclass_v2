import localforage from "localforage";
import { css } from "@emotion/react";
import { HashLoader } from "react-spinners";
import { useEffect } from "react";
import { Services } from "../mixing/services";
import global_variables from "../mixing/urls";

const override = css`
  display: block;
  margin: 20% auto;
`;
const HotReload = () => {
  useEffect(() => {
    hotload();
  }, []);

  const hotload = async () => {
    if ((await localforage.getItem("token")) !== null) {
      const complete_user = await localforage.getItem("complete_user");
      const u = await localforage.getItem("userdata");

      if (complete_user) {
        console.log("Image: .............." + complete_user.profile_pic);
        window.location.href = "/";
      } else {
        try {
          const res = await (
            await Services()
          ).get(global_variables().getUser + `/${u.user_id}`);
          console.log(res.data?.data);
          localforage.setItem("complete_user", res.data?.data).then(() => {
            window.location.href = "/";
          });
        } catch (err) {
          // console.log(err);
          window.location.href = "/";
          // logout_and_redirect();
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color="#4080ff" css={override} loading={true} size={100} />
    </div>
  );
};

export default HotReload;
