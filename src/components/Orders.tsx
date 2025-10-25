import { useEffect, useState } from "react";
import NewTable from "./reusable/MainTable";
import api from "../api/api";
import { useSelector } from "react-redux";
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
    <NewTable
      tableData={orders || []}
      tableHeaders={orderHeaders}
      filterKeys={orders ? ["company_name", "type", "status"] : []}
    ></NewTable>  
  );
}
