import localforage from "localforage";
import { useEffect, useState } from "react";
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
import jwtDecode from "jwt-decode";

const Signin = () => {
  const handleHandleCallbackResponse = async (response) => {
    // console.log(response);
    // console.log(response.credential);

    var user = jwtDecode(response.credential);

    // console.log(user);
    try {
      displayLoading("authenticating....");
      const res = await (
        await Services()
      ).post(global_variables().sigin, {
        username: user.email,
        password:
          "880710449497-8k8qttcfig311nqmh16l0qjbd53er8he.apps.googleusercontent.com",
      });

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
              if (currentUrl !== null) {
                window.location.href = currentUrl;
              } else {
                window.location.href = "/";
              }
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
      // console.log(err.response?.data?.message);
      displayErrMsg(err.response?.data?.message, () => {});
    }
  };

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "880710449497-8k8qttcfig311nqmh16l0qjbd53er8he.apps.googleusercontent.com",
      callback: handleHandleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google_sign_icon"),
      { theme: "outline", size: "large" }
    );

    // console.log(google);

    const urlParams = new URLSearchParams(window.location.search);
    const currentUrl = urlParams.get("currentUrl");
    // console.log(currentUrl);
    setCurrentUrl(currentUrl);
    checklogin();
  }, []);

  const checklogin = async () => {
    const token = await localforage.getItem("token");
    const user = await localforage.getItem("userdata");

    if (token !== null && user !== null) {
      window.location.href = "/";
    }
  };

  const [currentUrl, setCurrentUrl] = useState("");

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const siginin = async () => {
    displayLoading("authenticating....");
    if (email === "") {
      displayErrMsg("Please input a valid email Address");
    } else if (pwd === "") {
      displayErrMsg("Please input your password");
    } else if (pwd.length < 8) {
      displayErrMsg("Your password length cannot be  less than 8 digits");
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
                if (currentUrl !== null) {
                  window.location.href = currentUrl;
                } else {
                  window.location.href = "/reload";
                }
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
        displayErrMsg(err.response?.data?.message, () => {});
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

          <div id="google_sign_icon"></div>
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
