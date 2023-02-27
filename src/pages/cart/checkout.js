import NavigationBar from "../../component/navigation/public_navigation_bar";
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Payment } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import GeneralContext from "../../context/general_context";
import { useNavigate } from "react-router-dom";
import { formatCedis } from "../../component/Helpers/money";
import localforage from "localforage";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import { displayErrMsg, displayLoading } from "../../component/alerts/alerts";

const CheckOut = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(true);
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState(0);

  const getCart = async () => {
    setLoading(true);
    const userdata = await localforage.getItem("userdata");
    setEmail(userdata.email);
    setLname(userdata.last_name);
    setFname(userdata.first_name);
    // console.log(userdata);
    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCart +
          `?user_id=${userdata.user_id}&query_fields=price,status,image,course_id,cart_id,description`
      );
      setCart(res.data?.data);
      const courseIds = res.data?.data?.data?.map((obj) => obj.course_id);
      // console.log(courseIds);
      setCourses(courseIds);
      setLoading(false);
      setTotal(calculateTotal(res.data?.data));
      // console.log(calculateTotal(res.data?.data));

      if (res.data?.data?.data?.length === 0) {
        navigate("/cart");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const calculateTotal = (cartPassed) => {
    let sum = 0;

    for (let i = 0; i < cartPassed.data?.length; i++) {
      sum += cartPassed.data[i].price;
    }

    return sum;
  };

  useEffect(() => {
    getCart();
  }, []);

  const startPayemnt = async () => {
    displayLoading("loading....");

    const userdata = await localforage.getItem("userdata");

    const init_data = {
      email: email,
      amount: total,
      courses: courses,
    };
    try {
      const res = await (
        await Services()
      ).post(
        global_variables().initiatePyament + `/${userdata.user_id}`,
        init_data
      );

      console.log(res.data?.payload?.authorization_url);
      window.location.href = res.data?.payload?.authorization_url;
    } catch (error) {
      console.log(error);
      displayErrMsg("There was an error initializeing payment", () => {});
    }
  };

  return (
    <>
      <NavigationBar />
      {/* {JSON.stringify(courses)} */}
      <div className="p-10">
        {/* <Typography variant="h4" component="h1" className="mb-10">
          Checkout
        </Typography> */}
        <Grid className="mb-3" container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" className="mb-4">
              Order Summary
            </Typography>
            {cart.data?.map((item, idex) => {
              return (
                <Card key={idex}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography variant="subtitle1" component="h3">
                          {item.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          component="h3"
                          align="right"
                        >
                          {formatCedis(item.price)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}

            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="subtitle1" component="h3">
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      align="right"
                    >
                      {formatCedis(total)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" className="mb-4">
              Payment information
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" className="mb-4">
                  Payment Information
                </Typography>
                <Divider className="my-4" />
                <div className="my-3">
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="First name"
                      variant="outlined"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last name"
                      variant="outlined"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider className="my-4" />
        <div className="text-end mt-5">
          <Button
            variant="contained"
            endIcon={<Payment />}
            className="ml-auto"
            disabled={loading}
            onClick={startPayemnt}
          >
            Complete purchase
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
