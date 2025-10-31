import { useEffect, useState } from "react";
import api from "../../api/api";
import MainTable from "../reusable/MainTable";
import { Box, CircularProgress } from "@mui/material";

interface TableHeader {
  id: string;
  label: string;
}

export default function StockTable() {
  const stockHeaders: TableHeader[] = [
    { id: "company_name", label: "Company Name" },
    { id: "current_price", label: "Current Price (₹)" },
    { id: "percent_change", label: "% Change" },
  ];

  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("/stock/all").then((res) => {
      console.log("Stocks", res.data);
      setStocksData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        width="100%"
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 3, md: 10 },
        pt: { xs: 2, sm: 3, md: 5 },
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      <MainTable
        tableHeaders={stockHeaders}
        tableData={stocksData}
        filterKeys={["company_name"]}
        type="STOCK"
        title="Stocks"
        role="user"
      />
    </Box>
  );
}
