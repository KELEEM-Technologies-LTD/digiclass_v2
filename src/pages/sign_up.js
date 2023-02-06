import { Link } from "react-router-dom";
import GoogleButton from "../component/Buttons/GoogleButton";
import HorizontalRule from "../component/HorizontalRule";
import InputWithIcon from "../component/InputFields/InputWithIcon";
import PasswordInput from "../component/InputFields/PasswordInput";


const Signup = () => {
    return (<>
        <div
            style={{}}
            className="flex flex-col justify-center  md:items-center py-16"
        >
            <div className=" md:w-3/12 md:p-0 px-6">
                <p className="text-2xl mb-3 font-bold text-dark">
                    Sign up and start learning
                </p>
                <HorizontalRule />

                <GoogleButton />
                <div className="mt-5">
                    <InputWithIcon
                        placeholder="Enter your first name "
                        type="text"
                        className="py-5 border-primary-600 border flex  rounded-5 bg-primary-100  justify-between"
                        name="fname"
                    // value={state.fname}
                    // onChange={handleChange}
                    />
                </div>
                <div className="mt-5">
                    <InputWithIcon
                        placeholder="Enter your last name "
                        type="text"
                        className="py-5 border-primary-600 border flex  rounded-5 bg-primary-100  justify-between"
                        name="lname"
                    // value={state.lname}
                    // onChange={handleChange}
                    />
                </div>
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

                <div className="mt-5">
                    <PasswordInput
                        placeholder="Confirm Password"
                        style={{ borderWidth: "2px" }}
                        className="flex py-5 border-primary-600 border rounded-5 bg-primary-100  justify-between"
                        name="confirmPassword"
                    // value={state.confirmPassword}
                    // onChange={handleChange}
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
    </>)
}

export default Signup;