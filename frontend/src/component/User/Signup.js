import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";

const SignUp = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [ setAvatarPreview] = useState("/Profile.png");

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // eslint-disable-next-line no-restricted-globals
  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      toast.success("Successfully Register User");
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, redirect, navigate]);

  return (
    <section id="login">
      <div className="div1">
        <div className="div2">
          <div className="div3">
            <CgProfile className="profile-icon" />
          </div>

          <form
            className="form"
            onSubmit={registerSubmit}
            encType="multipart/form-data"
          >
            <div className="form-toggle">
              <Link
                to="/login"
                className={`form-toggle-link ${isLogin ? "active-link" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className={`form-toggle-link ${!isLogin ? "active-link" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </Link>
            </div>

            <div className="emaildiv">
              <label className="emaillabel" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={registerDataChange}
                required
                className="form-input"
              />
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
                value={email}
                onChange={registerDataChange}
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
                  onChange={registerDataChange}
                  required
                  className="form-input"
                />
                <div className="absolutediv">
                  <span className="cursordiv" onClick={handleTogglePassword}>
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </span>
                </div>
              </div>
            </div>
            <div className="passworddiv">
              <label className="passwordinput" htmlFor="confirm-password">
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  onChange={registerDataChange}
                  required
                  className="form-input"
                />
                <div className="absolutediv">
                  <span
                    className="cursordiv"
                    onClick={handleToggleConfirmPassword}
                  >
                    {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                  </span>
                </div>
              </div>
            </div>

            <button value="Register" className="button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
