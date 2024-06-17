import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "../Cart/CheckoutSteps";
import "./ConfirmOrder.css";
import { toast } from "react-toastify";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const totalPrice = subtotal;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = async () => {
    const data = {
      subtotal,
      totalPrice,
      paymentMethod,
    };

    if (
      !shippingInfo ||
      !shippingInfo.phoneNo ||
      !shippingInfo.pinCode ||
      !shippingInfo.country ||
      !shippingInfo.state ||
      !shippingInfo.city ||
      !shippingInfo.address
    ) {
      toast.error("Please fill out all shipping information.");
      return;
    }

    if (!user || !user.name || !user.email) {
      toast.error("Please ensure user information is complete.");
      return;
    }

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    if (paymentMethod === "cash") {
      navigate("/process/cash");
    } else if (paymentMethod === "card") {
      navigate("/process/payment");
    } else if (paymentMethod === "upi") {
      navigate("/process/online");
    }
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          {/* Shipping Info */}
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          {/* Cart Items */}
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          {/* Order Summary */}
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            {/* Payment Method Selection */}
            <div className="paymentMethod">
              <Typography>Select Payment Method</Typography>
              <div>
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cash">Cash</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="card">Card</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="upi">UPI/QR</label>
              </div>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
