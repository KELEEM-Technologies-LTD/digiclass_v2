import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { Services } from "../../mixing/services";
import global_variables from "../../mixing/urls";
import localforage from "localforage";
import { displayErrMsg, displaySuccMsg } from "../../component/alerts/alerts";

const VerifyTransactions = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trxRef = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  //   http://localhost:3000/verifytransaction?trxref=u3irysrf5q&reference=u3irysrf5q

  const verifyTransaction = async () => {
    if (reference && trxRef) {
      const verify_data = {
        reference: reference,
      };
      console.log(verify_data);
      const user = await localforage.getItem("userdata");
      try {
        const res = await (
          await Services()
        ).put(
          global_variables().verifyTransactions + `/${user.user_id}`,
          verify_data
        );

        console.log(res);
        window.location.href = "/profile?tabindex=3?success=1";
        // displaySuccMsg("Transaction successful", () => {
        // });
      } catch (error) {
        displayErrMsg("Transaction verification failed", () => {
          window.location.href = "/profile?tabindex=3";
        });
        console.log(error);
      }
    } else {
      displayErrMsg(
        "Transaction verification failed, transaction id not found",
        () => {
          window.location.href = "/profile?tabindex=3";
        }
      );
    }
  };

  useEffect(() => {
    verifyTransaction();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-primary-200">
        <CircularProgress color="primary" size={60} thickness={5} />
      </div>
    </>
  );
};

export default VerifyTransactions;
