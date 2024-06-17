import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../actions/orderAction";
import { Link as RouterLink } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import "./myOrders.css";

const MyOrdersComponent = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  const getStatusColor = (orderStatus) => {
    return orderStatus === "Delivered" ? "greenColor" : "redColor";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p className="error-text">Error: {error}</p>;
  }

  return (
    <div className="my-orders-container">
      <div className="status-indicator"></div>
      <Typography variant="h4" className="my-orders-heading">
        My Orders
      </Typography>
      <Typography variant="body1" className="welcome-text">
        Welcome, {user.name}!
      </Typography>
      <TableContainer component={Paper}>
        <Table className="orders-table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Items Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                className={`order-row ${getStatusColor(order.orderStatus)}`}
              >
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.orderItems.length}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  <IconButton
                    component={RouterLink}
                    to={`/order/${order._id}`}
                    aria-label="View Order Details"
                  >
                    <LaunchIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyOrdersComponent;
