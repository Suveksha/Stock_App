import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    api.post("/user/get_balance", { _id: user.id }).then((res) => {
      setCurrentBalance(res.data.balance);
    });
    api.post("/user/get_transactions", { _id: user.id }).then((res) => {
      setTransactions(res.data.transactions);
    });
  }, [user.id, currentBalance]);

  return (
    <div className="px-4 sm:px-10 pt-5 pb-5">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={isSmallScreen ? 2 : 3}
        mb={3}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            flex: isSmallScreen ? "1 1 100%" : "1 1 350px",
            minWidth: isSmallScreen ? "100%" : "300px",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: isSmallScreen ? 3 : 5,
              py: isSmallScreen ? 2.5 : 3.5,
              borderRadius: 4,
              background: "linear-gradient(90deg, #ffffff 0%, #f4fdf8 100%)",
              border: "1px solid #e0f0e8",
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight={500}
              >
                Current Balance
              </Typography>
              <Typography
                variant={isSmallScreen ? "h5" : "h4"}
                color="#0B6623"
                fontWeight={700}
                sx={{ mt: 0.5 }}
              >
                ₹ {currentBalance?.toLocaleString() ?? 0}
              </Typography>
            </Box>
            <Box
              sx={{
                width: isSmallScreen ? 40 : 50,
                height: isSmallScreen ? 40 : 50,
                borderRadius: "50%",
                background: "linear-gradient(145deg, #16a34a 0%, #0b6623 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 3px 10px rgba(22,163,74,0.25)",
              }}
            >
              ₹
            </Box>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            flex: isSmallScreen ? "1 1 100%" : "0 0 auto",
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "flex-end",
          }}
        >
          <Box
            display="flex"
            gap={isSmallScreen ? 1.5 : 2}
            flexWrap="nowrap"
            justifyContent={isSmallScreen ? "center" : "flex-end"}
          >
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #06402B 0%, #0a5a36 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #075c3d 0%, #0b7a4a 100%)",
                  transform: "translateY(-1px)",
                },
                px: isSmallScreen ? 2.5 : 4,
                py: isSmallScreen ? 1 : 1.5,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                fontSize: isSmallScreen ? "0.8rem" : "1rem",
              }}
              onClick={() => {
                setType("add");
                setOpen(true);
              }}
            >
              Add
            </Button>

            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #BF0A30 0%, #a7092a 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #d3123a 0%, #b50d30 100%)",
                  transform: "translateY(-1px)",
                },
                px: isSmallScreen ? 2.5 : 4,
                py: isSmallScreen ? 1 : 1.5,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                fontSize: isSmallScreen ? "0.8rem" : "1rem",
              }}
              onClick={() => {
                setType("withdraw");
                setOpen(true);
              }}
            >
              Withdraw
            </Button>
          </Box>
        </motion.div>
      </Box>

      {/* Table Section */}
      <Box
        sx={{
          mt: 2,
          flex: 1,
          width: "100%",
          overflowX: "auto",
        }}
      >
        <MainTable
          tableData={transactions}
          tableHeaders={transactionHeaders}
          filterKeys={["mode", "type"]}
        />
      </Box>

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
