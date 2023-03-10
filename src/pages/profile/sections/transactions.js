import localforage from "localforage";
import moment from "moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { displayErrMsg } from "../../../component/alerts/alerts";
import { formatCedis } from "../../../component/Helpers/money";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";
import CourseNameById from "./courseNameById";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Transactions = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState();

  const getTransactions = async () => {
    setLoading(true);

    const uid = await localforage.getItem("userdata");

    try {
      const res = await (
        await Services()
      ).get(global_variables().getTransactions + `/${uid.user_id}`);

      // console.log(res.data?.payload);
      setTransactions(res.data?.payload);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      displayErrMsg("Error loading transaction history", () => {});
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      width: "5%",
    },
    {
      name: "Amount",
      selector: (row) => formatCedis(row.amount),
      width: "15%",
    },
    {
      name: "Course(s) purchase",
      selector: (row) => (
        <ul>
          {row.items?.map((_item, index) => {
            return (
              <li className="mb-3 list-disc" key={index}>
                <Link to={`/my-course/${_item}`}>
                  <CourseNameById id={_item} /> <OpenInNewIcon />
                </Link>
              </li>
            );
          })}
        </ul>
      ),
      width: "35%",
    },
    {
      name: "Transaction Ref",
      selector: (row) => row.reference,
      width: "15%",
    },
    {
      name: "Date",
      selector: (row) => moment(row.add_date).format("Do MMM YYYY"),
      width: "15%",
    },
    {
      name: "status",
      selector: (row) =>
        row.status ? (
          "Completed"
        ) : (
          <p
            onClick={() => verifyTransaction(row.reference)}
            style={{ cursor: "pointer" }}
          >
            verify
          </p>
        ),
      width: "15",
    },
  ];

  const verifyTransaction = async (reference) => {
    if (reference) {
      const verify_data = {
        reference: reference,
      };
      // console.log(verify_data);
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
          // window.location.href = "/profile?tabindex=3";
        });
        console.log(error);
      }
    } else {
      displayErrMsg(
        "Transaction verification failed, transaction id not found",
        () => {
          // window.location.href = "/profile?tabindex=3";
        }
      );
    }
  };

  return (
    <>
      <div className="flex flex-col font-serif mb-10">
        {/* <p>List of transactions</p> */}
        <DataTable
          columns={columns}
          data={transactions}
          progressPending={loading}
          // noDataComponent="no transa"
        />
      </div>
    </>
  );
};

export default Transactions;
