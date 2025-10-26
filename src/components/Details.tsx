import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import OrderDialog from "./reusable/OrderDialog";

type Stock = {
  _id: string;
  company_name: string;
  symbol: string;
  current_price: number;
  percent_change: number;
  net_change: number;
  top_gain: boolean;
  top_loss: boolean;
  desc: string;
  image: string;
  historical_data: [
    {
      date: Date;
      open: string;
      high: string;
      low: number;
      close: number;
      _id: string;
    }
  ];
};

export default function StockDetails() {
  const { symbol } = useParams();
  const [stock, setStock] = useState<Stock>();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.auth.user);
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api
      .post("/stock/get", { symbol })
      .then((res) => {
        console.log("Stock", res.data);
        setStock(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [symbol]);

  const createOrder = ({
    quantity,
    type,
  }: {
    quantity: number;
    type: string;
  }) => {
    console.log("Type", type);
    api
      .post("/order/create", {
        user_id: user.id,
        stock_id: stock?._id,
        type,
        quantity,
        price_at_order: stock?.current_price,
      })
      .then((res) => {
        console.log("Order", res.data);
      });
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <CircularProgress />
      </div>
    );
  if (!stock)
    return (
      <div className="text-center mt-10 text-red-600">Stock not found</div>
    );

  return (
    <div className="pr-10 pl-10 pt-5 pb-5">
      <Card className="max-w-5xl mx-auto shadow-xl rounded-2xl p-6">
        <div className="flex items-center gap-6">
          <img
            src={stock.image}
            alt={stock.company_name}
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <Typography variant="h4" fontWeight={600}>
              {stock.company_name}
            </Typography>
            <Typography color="text.secondary">{stock.symbol}</Typography>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <Typography variant="h5" color="primary" fontWeight={600}>
              ₹{stock.current_price}
            </Typography>
            <Typography color={stock.percent_change >= 0 ? "green" : "red"}>
              {stock.percent_change >= 0 ? "▲" : "▼"} {stock.percent_change}% (
              {stock.net_change})
            </Typography>
          </div>

          <div className="flex gap-4">
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #06402B 0%, #0a5a36 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #075c3d 0%, #0b7a4a 100%)",
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
                setType("BUY");
                setOpen(true);
              }}
            >
              BUY
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
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0px 4px 10px rgba(191, 10, 48, 0.25)",
                transition: "all 0.2s ease",
              }}
              onClick={() => {
                setType("SELL");
                setOpen(true);
              }}
            >
              SELL
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <Typography variant="h6" mb={2}>
            Historical Performance
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stock.historical_data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString("en-IN", { month: "short" })
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(d) => new Date(d).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#1976d2"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <CardContent>
          <Typography variant="body1" mt={4}>
            {stock.desc}
          </Typography>
        </CardContent>
      </Card>

      <OrderDialog
        data={{
          currentPrice: stock.current_price,
          type,
        }}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={createOrder}
      />
    </div>
  );
}
