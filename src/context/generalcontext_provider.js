import localforage from "localforage";
import { useEffect, useState } from "react";
import GeneralContext from "./general_context";

const GeneralContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const token = await localforage.getItem("token");
      const userdata = await localforage.getItem("userdata");
      token !== null ? setIsLogged(true) : setIsLogged(false);
      userdata !== null ? setUser(userdata) : localforage.clear();

      // console.log(userdata);
    } catch (err) {
      setIsLogged(false);
    }
  };

  return (
    <GeneralContext.Provider value={{ isLogged, setIsLogged, user }}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
