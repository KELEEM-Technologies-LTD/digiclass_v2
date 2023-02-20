import { Avatar, Button } from "@mui/material";
import localforage from "localforage";
import { useState } from "react";
import {
  displayErrMsg,
  displaySuccMsg,
} from "../../../component/alerts/alerts";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";
import loadingImg from "./../../../assets/loading.gif";

const ProfilePicChange = ({ profile_pic, getUserInformation }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };

    reader.readAsDataURL(file);
    const data = new FormData();

    data.append("file", event.target.files[0]);

    const userdata = await localforage.getItem("userdata");

    console.log(data);

    // ${userdata.user_id}/profile
    try {
      const res = await (
        await Services()
      ).post(
        global_variables().updateProfile + `/${userdata.user_id}/profile`,
        data
      );
      console.log(res);
      getUserInformation();

      try {
        const res = await (
          await Services()
        ).get(global_variables().getUser + `/${userdata.user_id}`);
        console.log(res.data?.data);
        localforage.setItem("complete_user", res.data?.data).then(() => {
          displaySuccMsg("Profile picture uploaded successfully", () => {
            window.location.reload();
          });
        });
      } catch (err) {
        console.log(err);
        window.location.reload();
        // logout_and_redirect();
      }
    } catch (error) {
      displayErrMsg(error.response?.data?.message, () => {});
    }
  };

  return (
    <>
      <div className="flex gap-2 mt-10">
        <div className="">
          {profile_pic !== null ? (
            <Avatar
              alt={profile_pic}
              src={loading ? loadingImg : profile_pic}
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-primary-500"></div>
          )}
        </div>
        <div className="flex">
          <div>
            <p className="font-bold text-lg">Change Profile Image</p>
            <p className="md:w-7/12">
              Your profile picture can be changed once per month
            </p>
          </div>

          <label htmlFor="imageUploadBtn">
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              component="span"
            >
              Upload Image
            </Button>
            <input
              type="file"
              id="imageUploadBtn"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {/* {imageSrc && (
              <img src={imageSrc} alt="UploadedImage" className="mt-4" />
            )} */}
          </label>
        </div>
      </div>
    </>
  );
};

export default ProfilePicChange;
