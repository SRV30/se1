import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCashOrder } from '../../actions/orderAction';
import { v4 as uuidv4 } from 'uuid'; 
import './PaymentCash.css';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

const PaymentCash = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [customerName, setCustomerName] = useState(user.name);
  const [address, setAddress] = useState(shippingInfo.address);
  const [items, setItems] = useState(cartItems.map(item => item.name).join(', '));
  const [totalAmount, setTotalAmount] = useState(orderInfo.totalPrice);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: {
      status: 'Pending',
      id: uuidv4(), 
    },
    paymentMethod: 'Cash on Delivery',
    user: user._id,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createCashOrder(order));
      toast.success('Order placed successfully!');
      navigate('/success');
    } catch (error) {
      toast.error('Error placing order. Please try again.');
    }
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
      <button type="submit">Place Order</button>
    </form>
    </>
  )};
  

export default PaymentCash;
