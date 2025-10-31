import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/user/Dashboard";
import Feed from "./components/user/Feed";
import NavBar from "./components/user/NavBar";
import Details from "./components/user/Details";
import ProtectedRoute from "./components/user/ProtectedRoute";
import { useEffect } from "react";
import { restoreUser } from "./store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import StockTable from "./components/user/StockTable";
import SocketProvider from "./context/SocketProvider";
import OrderNotification from "./components/reusable/OrderNotifications";
import Wallet from "./components/user/Wallet";
import Orders from "./components/user/Orders";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminOrders from "./components/admin/AdminOrders";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("Restore User", user);
  }, [user]);

  return (
    <div>
      {user && <NavBar />}
      <div>
        <SocketProvider userId={user?.id || ""}>
          <OrderNotification />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock/:symbol"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock/all"
              element={
                <ProtectedRoute>
                  <StockTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/wallet"
              element={
                <ProtectedRoute>
                  <Wallet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders/></AdminProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SocketProvider>
      </div>
    </div>
  );
}

export default App;
