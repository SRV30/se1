import React, { Fragment, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <section id="login">
          <div className="div1">
            <div className="div2">
              <div className="div3">
                <CgProfile
                  style={{ color: "blue", fontSize: "48px" }}
                  className="profile-icon"
                />
              </div>

              <form className="form" onSubmit={loginSubmit}>
                <div className="form-toggle">
                  <Link
                    to="/login"
                    className={`form-toggle-link ${
                      isLogin ? "active-link" : ""
                    }`}
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    className={`form-toggle-link ${
                      !isLogin ? "active-link" : ""
                    }`}
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="emaildiv">
                  <label className="emaillabel" htmlFor="email">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="passworddiv">
                  <label className="passwordinput" htmlFor="password">
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter password"
                      name="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="form-input"
                    />
                    <div className="absolutediv">
                      <span
                        className="cursordiv"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="fpdiv">
                  <Link to="/password/forgot" className="fplink">
                    Forgot Password?
                  </Link>
                </div>

                <button className="button">Login</button>
              </form>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Login;
