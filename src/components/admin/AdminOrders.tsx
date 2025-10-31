import { useEffect, useState } from "react";
import api from "../../api/api";
import MainTable from "../reusable/MainTable";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useSocket } from "../../context/SocketProvider";

interface TableHeader {
  id: string;
  label: string;
}

export default function AdminOrders() {
  const socket = useSocket();
  const [orders, setOrders] = useState([]);
  const user = useSelector((state: any) => state.auth.user);
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
  useEffect(() => {
    api.post("/order/all", { user }).then((res) => {
      console.log("ORDERS", res.data);
      setOrders(res.data);
    });
    socket.on("order_update", () => {
      console.log("ORDER_UPDATE");
      api.post("/order/all", { user }).then((res) => {
        console.log("ORDERS UPDATE", res.data);
        setOrders(res.data);
      });
    });
  }, [socket, user]);

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
        filterKeys={orders ? ["company_name", "order_type", "status"] : []}
        title="Orders"
        role="admin"
        type="ORDER"
        admin_id={user.id}
      ></MainTable>
    </Box>
  );
}
