import React from "react";
import { css } from "@emotion/react";
import {HashLoader} from "react-spinners";
const override = css`
  display: block;
  margin: 20% auto;
`;
function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <HashLoader  color="#4080ff" css={override} loading={true} size={100} />
    </div>
  );
}

export default Spinner;
