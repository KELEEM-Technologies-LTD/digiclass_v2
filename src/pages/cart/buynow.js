import { Payment } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import localforage from "localforage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { displayErrMsg, displayLoading } from "../../component/alerts/alerts";
import { formatCedis } from "../../component/Helpers/money";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";

const BuyNow = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(true);
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");

  const { courseid } = useParams();

  const getData = async () => {
    const userdata = await localforage.getItem("userdata");
    setEmail(userdata.email);
    setLname(userdata.last_name);
    setFname(userdata.first_name);

    try {
      const res = await (
        await Services()
      ).get(
        global_variables().getCourses +
          `/${courseid}?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail`
      );
      //   console.log(res.data.data);
      setItem(res.data.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const startPayemnt = async () => {
    displayLoading("loading....");

    const userdata = await localforage.getItem("userdata");

    const init_data = {
      email: email,
      amount: item.price,
      courses: [courseid],
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
      <div className="p-10">
        <Grid className="mb-3" container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" className="mb-4">
              Order Summary
            </Typography>
            {loading ? (
              <></>
            ) : (
              <>
                <Card>
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
                          {formatCedis(item.price)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </>
            )}
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

export default BuyNow;
