import localforage from "localforage";
import moment from "moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { formatCedis } from "../../../component/Helpers/money";
import { Services } from "../../../mixing/services";
import global_variables from "../../../mixing/urls";

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

      //   console.log(res.data?.payload[0]);
      setTransactions(res.data?.payload);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const columns = [
    {
      name: "Amount",
      selector: (row) => formatCedis(row.amount),
    },
    {
      name: "Transaction Ref",
      selector: (row) => row.transaction_reference,
    },
    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("Do MMM YYYY"),
    },
  ];

  return (
    <div className="flex flex-col font-serif">
      {/* <p>List of transactions</p> */}

      <DataTable
        columns={columns}
        data={transactions}
        progressPending={loading}
        // noDataComponent="no transa"
      />
    </div>
  );
};

export default Transactions;
