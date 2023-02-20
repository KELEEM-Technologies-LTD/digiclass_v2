import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { displayWarningMsg } from "../component/alerts/alerts";
import InputWithIcon from "../component/InputFields/InputWithIcon";
import Footer from "../component/navigation/footer";
import NavigationBar from "../component/navigation/public_navigation_bar";
import { Services } from "../mixing/services";
import global_variables from "../mixing/urls";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  //:2000/api/v1/auth/available

  const sendResetLink = async (e) => {
    setLoading(true);

    try {
      const checkres = await (
        await Services()
      ).get(global_variables().checkuser + `?username=${email}`);

      console.log(checkres);

      if (checkres.data?.data?.exists) {
      } else {
        setLoading(false);
        displayWarningMsg(
          `There is no user registered under ${email} please create an account now`
        );
      }
    } catch (error) {
      console.log(error);
      setMessage("Error sending message");
    }
  };

  return (
    <>
      <NavigationBar />
      <div
        style={{}}
        className="flex flex-col justify-center  md:items-center py-28 font-serif"
      >
        <div className=" md:w-3/12 md:p-0 px-6">
          <p className="text-2xl mb-3 text-black font-bold text-center">
            Forgot password
          </p>
          <hr />
          <div className="mt-4">
            <p className="text-center">
              Enter the email address you use on DigiClass. We'll send you a
              link to reset your password.
            </p>
          </div>

          <div className="mt-4">
            <p style={{ color: "red" }} className="text-center">
              {message}
            </p>
            <InputWithIcon
              placeholder="Email"
              type="email"
              className=" py-5 border-primary-600 border flex rounded-5 bg-primary-100  justify-between"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-12">
            <button
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-secondary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary-700"
              disabled={loading}
              onClick={sendResetLink}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <p className="text-white">Send link</p>
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
      <Footer />
    </>
  );
};

export default ForgotPassword;
