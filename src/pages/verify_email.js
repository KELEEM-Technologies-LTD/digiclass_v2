import { useLayoutEffect } from "react";
import { displaySuccMsg } from "../component/alerts/alerts";
import { HashLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 20% auto;
`;

const VerifyEmail = () => {
  useLayoutEffect(() => {
    setTimeout(() => {
      displaySuccMsg("Email verification successful", () => {
        window.location.href = "/";
      });
    }, 4000);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#4080ff" css={override} loading={true} size={100} />
      </div>
    </>
  );
};

export default VerifyEmail;
