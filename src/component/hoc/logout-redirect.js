import localforage from "localforage";

const logout_and_redirect = async () => {
  localforage.clear().then(() => {
    window.location.href = "/login";
  });
};

export default logout_and_redirect;
