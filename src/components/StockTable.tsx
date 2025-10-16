import { useEffect, useState } from "react"
import api from "../api/api"
import Table from "./reusable/Table"

export default function StockTable() {
  const [stocksData,setStocksData]=useState([])
  useEffect(()=>{
    api.get("/stock/all").then((res)=>{
      console.log("Stocks",res.data)
      setStocksData(res.data)
    })
  },[])
  return (
     <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">📈 Indian Stocks</h1>
      <Table data={stocksData} />
    </div>
  )
}
