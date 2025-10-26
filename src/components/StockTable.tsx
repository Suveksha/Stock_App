import { useEffect, useState } from "react";
import api from "../api/api";
import MainTable from "./reusable/MainTable";
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
  useEffect(() => {
    api.get("/stock/all").then((res) => {
      console.log("Stocks", res.data);
      setStocksData(res.data);
    });
  }, []);
  return (
    <div className="pr-10 pl-10 pt-5">
      <MainTable
        tableHeaders={stockHeaders}
        tableData={stocksData}
        filterKeys={["company_name"]}
        type="STOCK"
        title="Stocks"
      />
    </div>
  );
}
