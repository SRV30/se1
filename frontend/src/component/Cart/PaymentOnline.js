// components/PaymentOnline.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCashOrder } from "../../actions/orderAction";
import { getPaymentDetails } from "../../actions/orderAction";
import { v4 as uuidv4 } from "uuid";
import "./PaymentCash.css";
import whatsappimg from "./whatsapp.png";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const PaymentOnline = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { paymentDetails } = useSelector((state) => state.paymentSetting) || {};

  const [customerName, setCustomerName] = useState(user.name);
  const [address, setAddress] = useState(shippingInfo.address);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [items, setItems] = useState(
    cartItems.map((item) => item.name).join(", ")
  );
  const [totalAmount, setTotalAmount] = useState(orderInfo.totalPrice);
  const [isWhatsappClicked, setIsWhatsappClicked] = useState(false);
  const paymentMethod = "UPI/QR";

  useEffect(() => {
    dispatch(getPaymentDetails());
  }, [dispatch]);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: {
      status: "Pending",
      id: uuidv4(),
    },
    paymentMethod,
    user: user._id,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createCashOrder(order));
      toast.success("Order placed successfully!");
      navigate("/success");
    } catch (error) {
      toast.error("Error placing order. Please try again.");
    }
  };

  const handleWhatsappClick = () => {
    setIsWhatsappClicked(true);
  };

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
    <form className="payment-form" onSubmit={submitHandler}>
      <div>
        <label>Customer Name</label>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Items</label>
        <input
          type="text"
          placeholder="Items (comma separated)"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Total Amount</label>
        <input
          type="number"
          placeholder="Total Amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Payment Method</label>
        <input type="text" value="UPI/QR" readOnly />
      </div>
      {paymentDetails && (
        <div className="payment-method-box">
          <label>UPI ID: {paymentDetails.upiId}</label>
          <h3 style={{ color: "red" }}>OR</h3>
          <img src={paymentDetails.qrCode} alt="QR Code" />
        </div>
      )}
      <div className="whatsapp-prompt-box">
        <h3 style={{ color: "red", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
          Please Send Payment Proof on WhatsApp before Placing Order
        </h3>
        <a
          aria-label="Chat on WhatsApp"
          href={`https://wa.me/${paymentDetails?.whatsappNo}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsappClick}
        >
          <img alt="Chat on WhatsApp" src={whatsappimg} />
        </a>
      </div>
      <button type="submit" disabled={!isWhatsappClicked}>
        Place Order
      </button>
    </form>
    </>
  );
};

export default PaymentOnline;
