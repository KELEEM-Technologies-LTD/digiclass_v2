import localforage from "localforage";
import { useEffect, useState } from "react";
import logout_and_redirect from "../component/hoc/logout-redirect";
import { Services } from "../mixing/services";
import global_variables from "../mixing/urls";
import GeneralContext from "./general_context";

const GeneralContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState([]);
  const [complete_user, setcomplete_user] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    checkStatus();
    getCartData();
  }, []);

  const checkStatus = async () => {
    try {
      const token = await localforage.getItem("token");
      const userdata = await localforage.getItem("userdata");
      const comp_user = await localforage.getItem("complete_user");
      setcomplete_user(comp_user);
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
      } catch (err) {
        if (err.response?.status === 401) {
          logout_and_redirect();
        }
      }

      const complete_user = await localforage.getItem("complete_user");
      const u = await localforage.getItem("userdata");

      if (complete_user?.profile_pic) {
        // console.log("Image: .............." + complete_user.profile_pic);
      } else {
        try {
          const res = await (
            await Services()
          ).get(global_variables().getUser + `/${u.user_id}`);
          console.log(res.data?.data);
          localforage.setItem("complete_user", res.data?.data).then(() => {
            window.location.reload();
          });
        } catch (err) {
          console.log(err);
          // logout_and_redirect();
        }
      }
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        complete_user,
        cart,
        cartLoading,
        getCartData,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
