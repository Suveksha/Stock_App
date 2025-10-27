import { useEffect, useState } from "react";
import MainTable from "./reusable/MainTable";
import api from "../api/api";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
interface TableHeader {
  id: string;
  label: string;
}
export default function Orders() {
  const orderHeaders: TableHeader[] = [
    {
      id: "company_name",
      label: "Company Name",
    },
    { id: "price_at_order", label: "Price at Order (₹)" },
    { id: "order_type", label: "Type" },
    { id: "quantity", label: "Quantity" },
    { id: "total_cost", label: "Total (₹)" },
    { id: "status", label: "Status" },
  ];

  const [orders, setOrders] = useState([]);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    api.post("/order/get", { user_id: user.id }).then((res) => {
      setOrders(res.data);
      console.log("Orders", res.data);
    });
  }, [user.id]);
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
        tableData={orders || []}
        tableHeaders={orderHeaders}
        filterKeys={orders ? ["company_name", "type", "status"] : []}
        title="Orders"
      ></MainTable>
    </Box>
  );
}
