import InputWithIcon from "../../../component/InputFields/InputWithIcon";

const ProfileSection = () => {
  return (
    <>
      <div className="flex flex-col px-12 w-full py-10">
        <div className="flex gap-2 ">
          <div className="h-16 w-16 rounded-full">
            <img
              src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="profileimage"
              className="h-16 w-16 rounded-full"
            />
            {/* <div className="h-16 w-16 rounded-full bg-primary-500"></div> */}
          </div>
          <div className="flex">
            <div>
              <p className="font-bold text-lg">Change Profile Image</p>
              <p className="md:w-7/12">
                Your profile picture can be changed once per month
              </p>
            </div>
            <input
              type="file"
              id="file"
              // ref={inputFile}
              // onChange={handleSelectFile}
              style={{ display: "none" }}
            />
            <button
              // onClick={onUploadButtonClick}
              className="hover:bg-secondary-600 hover:text-white h-10 flex-col items-center flex rounded-5 border-secondary-600 border py-2 px-8 bg-transparent"
            >
              <p>Upload</p>
            </button>
          </div>
        </div>

        {/* General information  */}
        <div className="grid grid-cols-12">
          <div className="md:col-span-8 col-span-12  grid md:grid-cols-2 grid-cols-1  gap-12 mt-8">
            <div className="">
              <p>First Name</p>

              <InputWithIcon
                placeholder="Full name"
                type="text"
                name="firstName"
                // value={state.firstName}
                // onChange={handleChange}
                className=" py-5 border-primary-600 border rounded-5 w-full  flex  bg-primary-100  justify-between"
              />
            </div>
            <div className="">
              <p>Last Name</p>

              <InputWithIcon
                placeholder="Phone number"
                type="text"
                name="lastName"
                // value={state.lastName}
                // onChange={handleChange}
                className="py-5 border-primary-600 border rounded-5 w-full  flex bg-primary-100  justify-between"
              />
            </div>
            <div className="">
              <p>Email</p>

              <InputWithIcon
                placeholder="Email"
                type="text"
                name="email"
                // value={state.email}
                // onChange={handleChange}
                className=" py-5 border-primary-600 border rounded-5 w-full  flex  bg-primary-100  justify-between"
              />
            </div>

            <div className="">
              <p>Phone number</p>

              <InputWithIcon
                placeholder="Phone number"
                type="text"
                name="phoneNumber"
                // value={state.phoneNumber}
                // onChange={handleChange}
                className="py-5 border-primary-600 border rounded-5 w-full  flex bg-primary-100  justify-between"
              />
            </div>

            <div className="text-right">
              <button
                // onClick={handleSubject}
                className="hover:bg-secondary-600 hover:text-white h-10 flex-col items-center flex rounded-5 border-secondary-600 border py-2 px-8 bg-transparent"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Passowrd settings  */}
        <div className="grid grid-cols-12">
          <div
            style={{ height: "1.2px" }}
            className=" bg-primary-200  col-span-8 my-12 w-full"
          />
        </div>
        <div className="grid grid-cols-12">
          <div className=" md:col-span-8 col-span-12 grid md:grid-cols-2 grid-cols-1  gap-12">
            <div className="">
              <p>Current password</p>

              <InputWithIcon
                placeholder="Current Password"
                type="text"
                className=" py-5 border-primary-600 border rounded-5 w-full  flex  bg-primary-100  justify-between"
                name="password"
                // value={state.password}
                // onChange={handleChange}
              />
            </div>
            <div className="">
              <p>New Password</p>

              <InputWithIcon
                placeholder="New Password"
                type="text"
                className=" py-5 border-primary-600 border rounded-5 w-full  flex  bg-primary-100  justify-between"
                name="c_password"
                // value={state.c_password}
                // onChange={handleChange}
              />
            </div>
            <div className="text-right">
              <button
                // onClick={handleUploadPassword}
                className="hover:bg-secondary-600 hover:text-white h-10 flex-col items-center flex rounded-5 border-secondary-600 border py-2 px-8 bg-transparent"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
