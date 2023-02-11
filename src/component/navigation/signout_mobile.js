import { Logout } from "@mui/icons-material";
import localforage from "localforage";
import React from "react";
import Swal from "sweetalert2";

const SignOut = () => {
  const handleLogoutUser = () => {
    Swal.fire({
      icon: "warning",
      position: "top",
      // title: '!!!!',
      text: "Are you sure you want to sign out?",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonColor: "red",
      reverseButtons: true,
    }).then((result) => {
      // result.isConfirmed
      if (result.isConfirmed) {
        localforage.clear().then(() => {
          window.location.href = "/login";
        });
      }
    });
  };

  return (
    <div
      className="relative mr-5"
      style={{ color: "red" }}
      onClick={handleLogoutUser}
    >
      <Logout />
    </div>
  );
};

export default SignOut;
