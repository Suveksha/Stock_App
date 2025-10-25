import { useState, useEffect } from "react";
import {
 
  Typography,
 
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import api from "../api/api";
import WalletDialog from "./reusable/WalletDialog";
import MainTable from "./reusable/MainTable";


interface Transaction {
  _id: string;
  amount: number;
  mode: string;
  type: string;
  description: string;
  createdAt: string;
}

interface TableHeader {
  id: string;
  label: string;
}
export default function Wallet() {
  const transactionHeaders: TableHeader[] = [
    { id: "amount", label: "Amount" },
    { id: "mode", label: "Mode" },
    { id: "type", label: "Type" },
    { id: "description", label: "Description" },
    { id: "createdAt", label: "Date" },
  ];
  const [currentBalance, setCurrentBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const user = useSelector((state: any) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
 
  useEffect(() => {
    api.post("/user/get_balance", { _id: user.id }).then((res) => {
      setCurrentBalance(res.data.balance);
    });
    api.post("/user/get_transactions", { _id: user.id }).then((res) => {
      setTransactions(res.data.transactions);
    });
  }, [user.id, currentBalance]);
  

  return (
    <div className="">
      <div className="text-3xl font-bold mb-5">Wallet</div>


      <div className="flex justify-between border rounded-2xl border-[#06402B] p-10 shadow-md bg-white">
        <div className="flex justify-between border-r w-[40%] pr-5 items-center">
          <Typography variant="h5" fontWeight={600}>
            Current Balance:
          </Typography>
          <Typography variant="h5" fontWeight={700} color="#06402B">
            ₹ {currentBalance ?? 0}
          </Typography>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#06402B",
              "&:hover": { backgroundColor: "#075c3d" },
            }}
            onClick={() => {
              setType("add");
              setOpen(true);
            }}
          >
            Add Balance
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#BF0A30",
              "&:hover": { backgroundColor: "#a7092a" },
            }}
            onClick={() => {
              setType("withdraw");
              setOpen(true);
            }}
          >
            Withdraw Balance
          </Button>
        </div>
      </div>

      <MainTable
        tableData={transactions}
        tableHeaders={transactionHeaders}
        filterKeys={["mode", "type"]}
      />

      <WalletDialog
        data={{ currentBalance, type }}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={({ amount, mode }) => {
          const endpoint =
            type === "add" ? "/user/add_balance" : "/user/withdraw";
          api
            .post(endpoint, { _id: user.id, amount, mode })
            .then((res) => setCurrentBalance(res.data.balance))
            .catch(console.error);
        }}
      />
    </div>
  );
}
