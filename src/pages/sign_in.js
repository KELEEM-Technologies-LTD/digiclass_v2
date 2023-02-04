import { Link } from "react-router-dom";
import InputWithIcon from "../component/InputFields/InputWithIcon";
import PasswordInput from "../component/InputFields/PasswordInput";


const Signin = () => {
    return (<>
        <div
            style={{}}
            className="flex flex-col justify-center  md:items-center py-16"
        >
            <div className=" md:w-3/12 md:p-0 px-6">
                <p className="text-2xl mb-3 font-bold text-dark text-center">
                    Log into your account
                </p>
                {/* <GoogleButton /> */}
                <div className="mt-5">
                    <InputWithIcon
                        placeholder="Enter your email "
                        type="email"
                        className=" py-5 border-primary-600 border flex  rounded-5 bg-primary-100  justify-between"
                        name="email"
                    // value={state.email}
                    // onChange={handleChange}
                    />
                </div>

                <div className="mt-5">
                    <PasswordInput
                        placeholder="Enter your password"
                        style={{ borderWidth: "2px" }}
                        className="flex py-5 border-primary-600 border rounded-5 bg-primary-100  justify-between"
                        name="password"
                    // value={state.password}
                    // onChange={handleChange}
                    />
                </div>

                {/* inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-secondary-600 px-4 py-2 text-base font-medium text-white shadow-xl hover:bg-secondary-800 */}
                <div className="mt-6 text-center">
                    <button
                        type="button"
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
    </>)
}

export default Signin;