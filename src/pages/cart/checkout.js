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
import { useContext, useEffect } from "react";
import GeneralContext from "../../context/general_context";
import { useNavigate } from "react-router-dom";
import { formatCedis } from "../../component/Helpers/money";

const CheckOut = () => {
  const navigate = useNavigate();
  const { cart, cartLoading } = useContext(GeneralContext);

  const checkAndRedirect = () => {
    if (cart.data?.length === 0) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    checkAndRedirect();
  }, []);

  return (
    <>
      <NavigationBar />
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" className="mb-4">
                  Payment Information
                </Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <div className="flex justify-between my-2">
                    <Button>Card</Button>
                    <Button>Momo</Button>
                  </div>
                </FormControl>
                <Divider className="my-4" />
                <div className="my-3">
                  <TextField
                    fullWidth
                    label="Name on Card"
                    variant="outlined"
                  />
                </div>
                <div className="mb-3">
                  <TextField fullWidth label="Card Number" variant="outlined" />
                </div>
                <div></div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiration Date"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="CVV" variant="outlined" />
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
            disabled={cartLoading}
          >
            Complete purchase
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
