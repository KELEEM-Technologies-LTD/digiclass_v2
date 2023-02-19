import { useEffect } from "react";
import { Link } from "react-router-dom";
// import GoogleButton from "../component/Buttons/GoogleButton";
import HorizontalRule from "../component/HorizontalRule";
import InputWithIcon from "../component/InputFields/InputWithIcon";
import PasswordInput from "../component/InputFields/PasswordInput";
import Footer from "../component/navigation/footer";
import NavigationBar from "../component/navigation/public_navigation_bar";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import {
  displayErrMsg,
  displayLoading,
  displaySuccMsg,
} from "../component/alerts/alerts";
import { Services } from "../mixing/services";
import global_variables from "../mixing/urls";
import localforage from "localforage";

const Signup = () => {
  const handleHandleCallbackResponse = async (response) => {
    console.log(response);
    // console.log(response.credential);

    var user = jwtDecode(response.credential);

    console.log(user);

    displayLoading("authenticating....");

    try {
      const res = await (
        await Services()
      ).post(global_variables().signup, {
        first_name: user.given_name,
        last_name: user.family_name,
        email: user.email,
        password:
          "880710449497-8k8qttcfig311nqmh16l0qjbd53er8he.apps.googleusercontent.com",
        user_role: "user",
      });
      console.log(res);
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
            displaySuccMsg(
              "Account created successfully,Logged in successfully",
              () => {
                window.location.href = "/";
              }
            );
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
    } catch (error) {
      console.log(error);
      displayErrMsg(error.response?.data?.message, () => {});
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
  }, []);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCPwd] = useState("");

  const signupUser = async () => {
    if (pwd !== cpwd) {
      displayErrMsg("Passwords do not match", () => {});
    } else {
      displayLoading("authenticating");
      try {
        const res = await (
          await Services()
        ).post(global_variables().signup, {
          first_name: fname,
          last_name: lname,
          email: email,
          password: cpwd,
          user_role: "user",
        });
        console.log(res);
        if (res.status === 200) {
          const userdata = res.data?.data?.user;
          const token = res.data?.data?.token;

          console.log(res);

          displaySuccMsg(
            "Account created successfully,Logged in successfully",
            () => {}
          );
        } else {
          displayErrMsg(
            "There was an error, please reload the page and try again"
          );
        }
      } catch (error) {
        console.log(error);
        displayErrMsg(error.response?.data?.message, () => {});
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
          <p className="text-2xl mb-3 font-bold text-dark">
            Sign up and start learning
          </p>
          <HorizontalRule />

          {/* <GoogleButton /> */}
          <div id="google_sign_icon"></div>

          <div className="mt-5">
            <InputWithIcon
              placeholder="Enter your first name "
              type="text"
              className="py-5 border-primary-600 border flex  rounded-5 bg-primary-100  justify-between"
              name="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <InputWithIcon
              placeholder="Enter your last name "
              type="text"
              className="py-5 border-primary-600 border flex  rounded-5 bg-primary-100  justify-between"
              name="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
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

          <div className="mt-5">
            <PasswordInput
              placeholder="Confirm Password"
              style={{ borderWidth: "2px" }}
              className="flex py-5 border-primary-600 border rounded-5 bg-primary-100  justify-between"
              name="confirmPassword"
              value={cpwd}
              onChange={(e) => setCPwd(e.target.value)}
            />
          </div>

          <div className="flex items-center mt-6 justify-center">
            <p className="text-center">
              By clicking "Sign up", you agree to DigiClass Terms & Conditions.
            </p>
          </div>
          <div className="mt-6 text-center">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-secondary-600 px-4 py-2 text-base font-medium text-white shadow-xl hover:bg-secondary-800"
              onClick={signupUser}
            >
              <p className="text-white">Sign Up</p>
            </button>
          </div>
          <div className="flex items-center mt-6 justify-center">
            <p>Already on Digiclass?</p>
            <Link to="/login">
              <p className="ml-2 text-secondary-700">Login</p>
            </Link>
          </div>
        </div>
        {/* <ModalBox
                handleClose={closeLoginInfoModal}
                open={openLoginInfoModal}
                content={<LoginInfo
                    loginInfo={state.signUpInfo}
                    close={handleModalClose}
                />}
            /> */}
      </div>

      <Footer />
    </>
  );
};

export default Signup;
