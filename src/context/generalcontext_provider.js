import localforage from "localforage";
import { useEffect, useState } from "react";
import { Services } from "../mixing/services";
import global_variables from "../mixing/urls";
import GeneralContext from "./general_context";

const GeneralContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(false);
  const [cartLoading, setCartLoading] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    checkStatus();
    getCartData();
  }, []);

  const checkStatus = async () => {
    try {
      const token = await localforage.getItem("token");
      const userdata = await localforage.getItem("userdata");
      token !== null ? setIsLogged(true) : setIsLogged(false);
      userdata !== null ? setUser(userdata) : localforage.clear();

      // console.log(token);
    } catch (err) {
      setIsLogged(false);
    }
  };

  const getCartData = async () => {
    if ((await localforage.getItem("token")) !== null) {
      setCartLoading(true);
      const userdata = await localforage.getItem("userdata");
      try {
        const res = await (
          await Services()
        ).get(
          global_variables().getCart +
            `?user_id=${userdata.user_id}&query_fields=price,status,image,course_id,cart_id,description`
        );
        // console.log(res.data?.data?.data);
        setCart(res.data?.data);
        setCartLoading(false);
      } catch (err) {}
    }
  };

  return (
    <GeneralContext.Provider
      value={{ isLogged, setIsLogged, user, cart, cartLoading, getCartData }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
