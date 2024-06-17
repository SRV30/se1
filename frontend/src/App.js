import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import WebFont from "webfontloader";
import React, { useState, useEffect } from "react";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import store from "./store";
import { Routes, Route } from "react-router-dom";
import Login from "./component/User/Login";
import SignUp from "./component/User/Signup";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import PaymentCash from "./component/Cart/PaymentCash.js";
import PaymentOnline from "./component/Cart/PaymentOnline.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import MyOrders from "./component/Orders/MyOrders.js";
import OrderDetails from "./component/Orders/OrderDetails.js";
import PaymentDetailsAdmin from "./component/admin/PaymentDetailsAdmin.js";
import ContactUs from "./component/layout/ContactUs/ContactUs.js";
import AdminContact from "./component/admin/AdminContact.js";
import AboutUs from "./component/layout/AboutUs/AboutUs.js";
import AdminAbout from "./component/admin/AdminAbout.js";
import NotFound from "./component/layout/Not Found/NotFound.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/se/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return ( 
    <>
      <ToastContainer position="top-center" />
      <div className="app-container">
        <Header />

        {isAuthenticated && <UserOptions user={user} />}

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/process/payment"
              element={
                <ProtectedRoute>
                  <>
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/process/cash"
              element={
                <ProtectedRoute>
                  <PaymentCash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/process/online"
              element={
                <ProtectedRoute>
                  <PaymentOnline />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              isAdmin={true}
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/product"
              element={
                <ProtectedRoute>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/product/:id"
              element={
                <ProtectedRoute>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/order/:id"
              element={
                <ProtectedRoute>
                  <ProcessOrder />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <UsersList />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/user/:id"
              element={
                <ProtectedRoute>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/reviews"
              element={
                <ProtectedRoute>
                  <ProductReviews />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/payment"
              element={
                <ProtectedRoute>
                  <PaymentDetailsAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/contact"
              element={
                <ProtectedRoute>
                  <AdminContact />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/about-us"
              element={
                <ProtectedRoute>
                  <AdminAbout />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
