import { CircularProgress } from "@mui/material";
import localforage from "localforage";
import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { displayErrMsg, displaySuccMsg } from "../component/alerts/alerts";
import InputWithIcon from "../component/InputFields/InputWithIcon";
import NavigationBar from "../component/navigation/public_navigation_bar";
import { Services } from "../mixing/services";
import global_variables from "../mixing/urls";

const VerifyAndResetPassword = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [pwd, setpwd] = useState("");
  const [pwdc, setCpwd] = useState("");
  const { verification_id } = useParams();

  const resetPwd = async () => {
    setLoading(true);

    if (pwd === "" || pwdc === "") {
      displayErrMsg("Please enter a new password and confirm it.", () => {});
    } else {
      try {
        const res = await (
          await Services()
        ).post(global_variables().resetPwd + `/${verification_id}`, {
          password: pwd,
          password_confirm: pwdc,
        });

        console.log(res.data);

        try {
          const sendNotif = await (
            await Services()
          ).post(global_variables().postNotification, {
            target: user,
            heading: "Password reset notification",
            message: "You have successfully reset your account password",
          });

          displaySuccMsg(res.data?.data?.message, () => {
            window.location.href = "/login";
          });
        } catch (error) {
          displaySuccMsg(res.data?.data?.message, () => {
            window.location.href = "/login";
          });
        }
      } catch (error) {
        if (error.response?.status === 400) {
          displayErrMsg("please enter a strong password", () => {});
        } else if (error.response?.status === 403) {
          displayErrMsg("invalid reset token, please try again", () => {
            window.location.href = "/password/reset";
          });
        } else {
          displayErrMsg(
            "error changing password, please try again later",
            () => {
              window.location.href = "/password/reset";
            }
          );
        }
      }
    }
  };

  const verifyToken = async () => {
    setPageLoading(true);
    try {
      const res = await (
        await Services()
      ).get(global_variables().resetPwd + `/${verification_id}`);
      setUser(res.data.data?.user);
      console.log(res.data.data?.user);
      if (res.data.data?.isValid) {
        setPageLoading(false);
      } else {
        displayErrMsg("invalid authentication token", () => {
          window.location.href = "/password/reset";
        });
      }
    } catch (error) {
      displayErrMsg("invalid authentication token", () => {
        window.location.href = "/password/reset";
      });
    }
  };

  useLayoutEffect(() => {
    verifyToken();
    checklogin();
  }, []);

  const checklogin = async () => {
    const token = await localforage.getItem("token");
    const user = await localforage.getItem("userdata");

    if (token !== null && user !== null) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <NavigationBar />
      {pageLoading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={80} />
        </div>
      ) : (
        <div
          style={{}}
          className="flex flex-col justify-center  md:items-center py-28 font-serif"
        >
          <div className=" md:w-3/12 md:p-0 px-6">
            <p className="text-2xl mb-3 text-black font-bold text-center">
              Reset Passowrd
            </p>
            <hr />
            <div className="mt-4">
              <p className="text-center">
                Enter a new password for your account
              </p>
            </div>

            <div className="mt-4">
              <p style={{ color: "red" }} className="text-center">
                {/* {message} */}
              </p>
              <InputWithIcon
                placeholder="Password"
                type="password"
                className=" py-5 mb-5 border-primary-600 border flex rounded-5 bg-primary-100  justify-between"
                value={pwd}
                onChange={(e) => setpwd(e.target.value)}
              />
              <InputWithIcon
                placeholder="Confirm password"
                type="password"
                className=" py-5 border-primary-600 border flex rounded-5 bg-primary-100  justify-between"
                value={pwdc}
                onChange={(e) => setCpwd(e.target.value)}
              />
            </div>

            <div className="mt-12">
              <button
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-secondary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary-700"
                disabled={loading}
                onClick={resetPwd}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <p className="text-white">Reset password</p>
                )}
              </button>
            </div>

            <div className="flex items-center mt-12 justify-center">
              <p>Back to</p>
              <Link to="/login">
                <p className="ml-2 text-secondary-700">Log in</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyAndResetPassword;
