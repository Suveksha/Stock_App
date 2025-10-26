import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import api from "../api/api";
import WalletDialog from "./reusable/WalletDialog";
import MainTable from "./reusable/MainTable";
import { motion } from "framer-motion";

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
    <div className="pr-10 pl-10 pt-5 pb-5">
      <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  p={4}
  gap={3}
  flexWrap="wrap"
>
  {/* Current Balance Section */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{ flex: "1 1 350px" }}
  >
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 5,
        py: 3.5,
        borderRadius: 4,
        background: "linear-gradient(90deg, #ffffff 0%, #f4fdf8 100%)",
        border: "1px solid #e0f0e8",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <Box>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          fontWeight={500}
          sx={{ letterSpacing: 0.4 }}
        >
          Current Balance
        </Typography>
        <Typography
          variant="h4"
          color="#0B6623"
          fontWeight={700}
          sx={{
            mt: 0.5,
            textShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          ₹ {currentBalance?.toLocaleString() ?? 0}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background:
            "linear-gradient(145deg, #16a34a 0%, #0b6623 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 700,
          fontSize: "1.1rem",
          boxShadow: "0 3px 10px rgba(22,163,74,0.25)",
        }}
      >
        ₹
      </Box>
    </Paper>
  </motion.div>

  {/* Action Buttons */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <Box display="flex" gap={2} flexWrap="wrap">
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(135deg, #06402B 0%, #0a5a36 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #075c3d 0%, #0b7a4a 100%)",
            transform: "translateY(-1px)",
          },
          px: 4,
          py: 1.5,
          borderRadius: 3,
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "0px 4px 10px rgba(6, 64, 43, 0.3)",
          transition: "all 0.2s ease",
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
          background: "linear-gradient(135deg, #BF0A30 0%, #a7092a 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #d3123a 0%, #b50d30 100%)",
            transform: "translateY(-1px)",
          },
          px: 4,
          py: 1.5,
          borderRadius: 3,
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "0px 4px 10px rgba(191, 10, 48, 0.25)",
          transition: "all 0.2s ease",
        }}
        onClick={() => {
          setType("withdraw");
          setOpen(true);
        }}
      >
        Withdraw Balance
      </Button>
    </Box>
  </motion.div>

 

</Box>

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
