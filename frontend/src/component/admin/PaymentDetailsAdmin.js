import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaymentDetails,
  updatePaymentDetails,
} from "../../actions/orderAction";
import { toast } from "react-toastify";
import { UPDATE_PAYMENT_DETAILS_RESET } from "../../constants/orderConstants";
import "./PaymentDetailsAdmin.css";

const PaymentDetailsAdmin = () => {
  const dispatch = useDispatch();
  const { paymentDetails } = useSelector((state) => state.paymentSetting) || {};
  const { isUpdated, error } =
    useSelector((state) => state.paymentUpdate) || {};

  const [upiId, setUpiId] = useState(paymentDetails?.upiId || "");
  const [qrCode, setQrCode] = useState(paymentDetails?.qrCode || "");
  const [whatsappNo, setWhatsappNo] = useState(
    paymentDetails?.whatsappNo || ""
  );

  useEffect(() => {
    if (isUpdated) {
      toast.success("Payment details updated successfully!");
      dispatch({ type: UPDATE_PAYMENT_DETAILS_RESET });
    }
    if (error) {
      toast.error(error);
    }
    dispatch(getPaymentDetails());
  }, [dispatch, isUpdated, error]);

  useEffect(() => {
    if (paymentDetails) {
      setUpiId(paymentDetails.upiId || "");
      setQrCode(paymentDetails.qrCode || "");
      setWhatsappNo(paymentDetails.whatsappNo || "");
    }
  }, [paymentDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("upiId", upiId);
    myForm.set("qrCode", qrCode);
    myForm.set("whatsappNo", whatsappNo);

    dispatch(updatePaymentDetails(myForm));
  };

  return (
    <form className="payment-details-form" onSubmit={submitHandler}>
      <div>
        <label>UPI ID</label>
        <input
          type="text"
          placeholder="UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>QR Code URL</label>
        <input
          type="text"
          placeholder="QR Code URL"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          required
        />
      </div>
      <div>
        <label>WhatsApp Number</label>
        <input
          type="text"
          placeholder="WhatsApp Number"
          value={whatsappNo}
          onChange={(e) => setWhatsappNo(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Payment Details</button>
    </form>
  );
};

export default PaymentDetailsAdmin;
