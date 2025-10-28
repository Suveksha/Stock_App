import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Notification = {
  order_type: string;
  price_at_order: number;
  quantity: number;
  stock_id: string;
  user_id: string;
  message: string;
  order_id: string;
  status: string;
};
const OrderNotification = () => {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotificationType = (status: string) => {
    if(status==="SUCCESS")
      return "success";
    else if(status==="REJECTED")
      return "error";
    else 
      return "info";
  }
  useEffect(() => {
    if (!socket) return;

    const handleOrderUpdate = (data: any) => {
      console.log("NewOrder", data);
      setNotifications((prev) => [...prev, data]);
    };

    const handleBalanceUpdate=(data:any)=>{
      console.log("Balance Update Event",data)
       setNotifications((prev) => [...prev, data]);
    }

    // socket.on("orderStatusUpdate", handleOrderUpdate);
    socket.on("new_order", handleOrderUpdate); 
    socket.on("wallet", handleBalanceUpdate);

    return () => {
      // socket.off("orderStatusUpdate", handleOrderUpdate);
      socket.off("new_order", handleOrderUpdate);
      socket.off("wallet", handleBalanceUpdate);
    };
  }, [socket]);

  useEffect(() => {
    console.log("Notifications", notifications);
  });

  const handleClose = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={index}
          open={true}
          autoHideDuration={5000}
          onClose={() => handleClose(index)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => handleClose(index)}
            severity={getNotificationType(notification.status)}
            sx={{ width: "100%", fontSize: "1rem" }}
          >
            {notification.message }
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default OrderNotification;
