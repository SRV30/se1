const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cashModel = require("../models/cashorderModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid");

// Stripe Payment
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const { amount, description, customerDetails } = req.body;

  const myPayment = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
    description,
    shipping: {
      name: customerDetails.name,
      address: {
        line1: customerDetails.address.line1,
        city: customerDetails.address.city,
        state: customerDetails.address.state,
        postal_code: customerDetails.address.postal_code,
        country: customerDetails.address.country,
      },
    },
    metadata: {
      company: "Samridhi Enterprises",
      customerEmail: customerDetails.email,
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

// Create Cash Order
exports.cashOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, itemsPrice, totalPrice, paymentMethod } =
    req.body;

  const orderData = {
    shippingInfo,
    orderItems,
    itemsPrice,
    totalPrice,
    paymentInfo: {
      id: uuid.v4(),
      status: "Pending",
    },
    paymentMethod,
    user: req.user._id,
    paidAt: null,
  };

  const order = await cashModel.create(orderData);

  res.status(201).json({
    success: true,
    order,
  });
});

// UPI/ QR
const PaymentDetails = require("../models/paymentDetailsModel");

exports.getPaymentDetails = async (req, res) => {
  const paymentDetails = await PaymentDetails.findOne();
  res.status(200).json(paymentDetails);
};

exports.updatePaymentDetails = async (req, res) => {
  const { upiId, qrCode, whatsappNo } = req.body;

  let paymentDetails = await PaymentDetails.findOne();

  if (!paymentDetails) {
    paymentDetails = new PaymentDetails({ upiId, qrCode, whatsappNo });
  } else {
    paymentDetails.upiId = upiId;
    paymentDetails.qrCode = qrCode;
    paymentDetails.whatsappNo = whatsappNo;
  }

  await paymentDetails.save();

  res.status(200).json({
    success: true,
    paymentDetails,
  });
};

