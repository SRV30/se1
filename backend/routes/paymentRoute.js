const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  cashOrder,
  getPaymentDetails,
  updatePaymentDetails,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

router.route("/cash/process").post(isAuthenticatedUser, cashOrder);

router.route("/paymentDetails").get(isAuthenticatedUser, authorizeRoles("admin"), getPaymentDetails);
router.route("/paymentDetails").put(isAuthenticatedUser, authorizeRoles("admin"), updatePaymentDetails);

module.exports = router;
