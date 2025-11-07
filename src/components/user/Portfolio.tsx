import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/api";
import MainTable from "../reusable/MainTable";

type Portfolio = {
  net_quantity: string;
  avg_buy_price: number;
  invested_amount: number;
  current_price: number;
  current_value: number;
  total_return: number;
  stock_id: string;
  company_name: string;
  symbol: string;
};

type Total = {
  totalInvestment: number;
  currentValue: number;
  totalReturn: number;
};

interface TableHeader {
  id: string;
  label: string;
}

export default function Portfolio() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [portfolio, setPortfolio] = useState<Portfolio[]>();
  const [totals, setTotals] = useState<Total>();
  const user = useSelector((state: any) => state.auth.user);

  const portfolioHeaders: TableHeader[] = [
    { id: "company_name", label: "Company Name" },
    { id: "net_quantity", label: "Quantity" },
    { id: "invested_amount", label: "Invested" },
    { id: "avg_buy_price", label: "Avg Buy Price" },
    { id: "current_price", label: "Current Price" },
    { id: "current_value", label: "Current Value" },
    { id: "total_return", label: "Total Return" },
  ];

  useEffect(() => {
    api.post("/user/portfolio", { user_id: user.id }).then((res: any) => {
      setPortfolio(res.data.portfolio);
      setTotals(res.data.totals);
    });
  }, [user.id]);

  return (
    <>
      {!portfolio && !totals ? (
        <CircularProgress />
      ) : (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={isSmallScreen ? 2 : 3}
          m={3}
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
                flexDirection: isSmallScreen ? "column" : "row",
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
                  Current Value
                </Typography>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  color="#0B6623"
                  fontWeight={700}
                  sx={{ mt: 0.5 }}
                >
                  ₹{totals?.currentValue.toLocaleString("en-IN") ?? 0}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Total Investment
                </Typography>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  color="#0B6623"
                  fontWeight={700}
                  sx={{ mt: 0.5 }}
                >
                  ₹ {totals?.totalInvestment.toLocaleString("en-IN") ?? 0}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Total Return
                </Typography>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  color={totals && totals?.totalReturn < 0 ? "red" : "#0B6623"}
                  fontWeight={700}
                  sx={{ mt: 0.5 }}
                >
                  ₹{totals?.totalReturn.toLocaleString("en-IN") ?? 0}
                </Typography>
              </Box>
            </Paper>
          </motion.div>

          <MainTable
            tableData={portfolio ?? []}
            tableHeaders={portfolioHeaders}
            role={user.role}
            title=""
            filterKeys={["company_name"]}
            type="STOCK"
          />
        </Box>
      )}
    </>
  );
}
