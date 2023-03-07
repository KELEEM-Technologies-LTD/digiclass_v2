import { useContext, useEffect, useState } from "react";
import Footer from "../../component/navigation/footer";
import NavigationBar from "./../../component/navigation/public_navigation_bar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import GeneralContext from "../../context/general_context";
import { formatCedis } from "../../component/Helpers/money";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import { displayErrMsg, displaySuccMsg } from "../../component/alerts/alerts";
import logout_and_redirect from "../../component/hoc/logout-redirect";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, getCartData } = useContext(GeneralContext);

  useEffect(() => {
    const courseIds = cart.data?.map((obj) => obj.course_id);
    // console.log(courseIds);
    // console.log(calculateTotal());
  }, []);

  const calculateTotal = () => {
    let sum = 0;

    for (let i = 0; i < cart.data?.length; i++) {
      sum += cart.data[i].price;
    }

    return sum;
  };

  const removeFromCart = async (id) => {
    try {
      const res = await (
        await Services()
      ).delete(global_variables().delFromCart + `/${id}`);

      // console.log(res);

      getCartData();
      displaySuccMsg(res.data?.data?.message, () => {});
    } catch (err) {
      if (err.response?.status === 401) {
        logout_and_redirect();
      }
      displayErrMsg("Error removing item from cart", () => {
        getCartData();
      });
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col">
        {/* header with tabs */}
        <div className="flex flex-col bg-secondary-600 md:px-16 md:h-30 h-32 px-3 justify-center md:justify-end">
          <div className="flex justify-between items-center">
            <p className="text-2xl md:text-4xl md:font-bold text-white">
              Shopping Cart
            </p>
            <div className="flex flex-col md:hidden">
              <p className="text-white">Total</p>
              <p className=" font-bold text-white text-2xl">
                {formatCedis(calculateTotal())}
              </p>
            </div>
          </div>

          <div className="hidden md:flex justify-between md:mt-8">
            <div>
              <button className={`border-primary-100 mr-6 py-2 border-b-2 `}>
                <p className="text-white">Cart</p>
              </button>
            </div>
          </div>
        </div>

        {/* List of Itmes  */}
        <div className="p-10">
          {/* <Typography variant="h4" component="h1" className="mb-10">
            Your Cart
          </Typography> */}
          {cart.data?.map((item, index) => {
            return (
              <Card className="mb-4" key={index}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <CardMedia
                        component="img"
                        height="50"
                        image={item.image}
                        alt="Product Image"
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <Box>
                        <Typography variant="h6" component="h2">
                          {item.description}
                        </Typography>
                        <Typography color="text.secondary" className="mb-2">
                          Product Description
                        </Typography>
                        <Typography variant="h6" component="h3">
                          {formatCedis(item.price)}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => {
                            removeFromCart(item.cart_id);
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
          <Divider className="my-4" />

          <div className="flex justify-between mt-2">
            <Typography variant="h5" component="h2" className="mb-4">
              Total: {formatCedis(calculateTotal())}
            </Typography>
            <Button
              variant="contained"
              endIcon={<ShoppingCart />}
              className="ml-auto"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
