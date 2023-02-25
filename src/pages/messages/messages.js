import localforage from "localforage";
import { useEffect, useState } from "react";
import Footer from "../../component/navigation/footer";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import MessageWindow from "./msg";

const Messages = () => {
  return (
    <>
      <NavigationBar />
      <div style={{ minHeight: "50vh" }}>
        <MessageWindow />
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Messages;
