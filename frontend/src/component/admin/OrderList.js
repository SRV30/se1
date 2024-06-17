import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { toast } from "react-toastify";

const OrderList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <table className="orderTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Items Qty</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id} className={order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                    <td>{order._id}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.orderItems.length}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      <Link to={`/admin/order/${order._id}`}>
                        <CiEdit />
                      </Link>
                      <Button onClick={() => deleteOrderHandler(order._id)}>
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
