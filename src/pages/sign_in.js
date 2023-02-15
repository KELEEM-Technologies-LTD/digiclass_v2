import localforage from "localforage";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  displayErrMsg,
  displayLoading,
  displaySuccMsg,
} from "../component/alerts/alerts";
import GoogleButton from "../component/Buttons/GoogleButton";
import HorizontalRule from "../component/HorizontalRule";
import InputWithIcon from "../component/InputFields/InputWithIcon";
import PasswordInput from "../component/InputFields/PasswordInput";
import Footer from "../component/navigation/footer";
import NavigationBar from "../component/navigation/public_navigation_bar";
import { Services } from "../mixing/services";
import global_variables from "../mixing/urls";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const siginin = async () => {
    displayLoading("authenticating....");
    if (email === "") {
      displayErrMsg("Please input a valid email Address");
    } else if (pwd === "") {
      displayErrMsg("Please input your password");
    } else {
      var sigininData = {
        username: email,
        password: pwd,
      };

      try {
        const res = await (
          await Services()
        ).post(global_variables().sigin, sigininData);
        // console.log(res.status);

        if (res.status === 200) {
          const userdata = res.data?.data?.user;
          const token = res.data?.data?.token;

          // console.log(res);

          localforage
            .setItem("userdata", userdata)
            .then(function () {
              return localforage.setItem("token", token);
            })
            .then(function () {
              displaySuccMsg("Logged in successfully", () => {
                window.location.href = "/";
              });
              // displaySuccMsg('Logged in successfully', () => { window.history.back() })
            })
            .catch((err) => {
              console.log(err);
              displayErrMsg(
                "There was an error, please reload the page and try again"
              );
            });
        } else {
          displayErrMsg(
            "There was an error, please reload the page and try again"
          );
        }
      } catch (err) {
        console.log(err);
        displayErrMsg();
      }
    }
  };

  return (
    <>
      <NavigationBar />
      <div
        style={{}}
        className="flex flex-col justify-center  md:items-center py-16"
      >
        <div className=" md:w-3/12 md:p-0 px-6">
          <p className="text-2xl mb-3 font-bold text-dark text-center">
            Log into your account
          </p>
          <HorizontalRule />
          <GoogleButton />
          <div className="mt-5">
            <InputWithIcon
              placeholder="Enter your email "
              type="email"
              className=" py-5 border-primary-600 border flex  rounded-5 bg-primary-100  justify-between"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <PasswordInput
              placeholder="Enter your password"
              style={{ borderWidth: "2px" }}
              className="flex py-5 border-primary-600 border rounded-5 bg-primary-100  justify-between"
              name="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>

          {/* inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-secondary-600 px-4 py-2 text-base font-medium text-white shadow-xl hover:bg-secondary-800 */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={siginin}
              className="whitespace-nonwrap border py-2 px-12 bg-secondary-600 text-base font-medium text-white hover:bg-secondary-800"
            >
              Sign in
            </button>
          </div>
          <div className="flex items-center mt-6 justify-center">
            <p>Or</p>
            <Link to="/password/reset">
              <p className="ml-2 text-secondary-700">Forgot password</p>
            </Link>
          </div>

          <div className="flex items-center mt-6 justify-center">
            <p>New to Digiclass?</p>
            <Link to="/signup">
              <p className="ml-2 text-secondary-700">Sign Up</p>
            </Link>
          </div>
        </div>
        {/* <ModalBox
                handleClose={closeLoginInfoModal}
                open={openLoginInfoModal}
                content={<LoginInfo
                    loginInfo={state.SigninInfo}
                    close={handleModalClose}
                />}
            /> */}
      </div>

      <Footer />
    </>
  );
};

export default Signin;
