import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { AccountTree } from "@mui/icons-material";
import "./processOrder.css";

const OrderDetailsPage = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", status);
    dispatch(updateOrder(orderId, formData));
  };

  const updateOrderStatus = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (isUpdated) {
      toast.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [dispatch, orderId, isUpdated, error, updateError]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="order-details-container">
      <h2 className="order-details-header">Order Details</h2>

      {order && (
        <div className="order-details">
          <div className="shipping-details">
            <h3>Shipping Details</h3>
            <div className="user-details">
              <p>
                Name: <span>{order.user && order.user.name}</span>
              </p>
            </div>

            <p>
              Phone Number: {order.shippingInfo && order.shippingInfo.phoneNo}
            </p>
            <p>
              Address:{" "}
              {order.shippingInfo &&
                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
            </p>
          </div>

          <div className="payment-status">
            <p>
              Payment Status:{" "}
              <span
                className={`payment-status ${
                  order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? ""
                    : "not-paid"
                }`}
              >
                {order.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID"}
              </span>
            </p>
          </div>

          <div className="order-items">
            <h3>Order Items</h3>
            {order.orderItems &&
              order.orderItems.map((item, index) => (
                <div className="order-item" key={index}>
                  <img src={item.image} alt="Product" />
                  <div className="order-item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
          </div>

          <form
            className="status-update-form"
            onSubmit={updateOrderSubmitHandler}
          >
            <div>
              <AccountTree />
              <select
                value={status}
                onChange={updateOrderStatus}
                onBlur={updateOrderSubmitHandler}
              >
                <option value="">Choose Category</option>
                {order.orderStatus === "Processing" && (
                  <option value="Shipped">Shipped</option>
                )}
                {order.orderStatus === "Shipped" && (
                  <option value="Delivered">Delivered</option>
                )}
                {order.orderStatus === "Delivered" && (
                  <option value="Shipped">Shipped</option>
                )}
              </select>
            </div>
            <Button
              className="submit-button"
              type="submit"
              disabled={loading || status === ""}
            >
              Process
            </Button>
          </form>

          {error && <p className="error-message">{error}</p>}
          {updateError && <p className="error-message">{updateError}</p>}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
