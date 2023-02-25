import Footer from "../../component/navigation/footer";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import MessageWindow from "./msg";

const Messages = () => {
  return (
    <>
      <NavigationBar />
      <div style={{ minHeight: "50vh" }}>
        <MessageWindow />
      </div>

      <Footer />
    </>
  );
};

export default Messages;
