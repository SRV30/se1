import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Logo from "../../../images/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import { toast } from "react-toastify";
import UserOptions from "./UserOptions";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" height={50} width={90} />
        </Link>
      </div>

      <form className="search-box" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search here..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <IoSearch size={24} />
        </button>
      </form>

      <div className="usercartlogin">
        <div className="cart">
          <Link to="/cart">
            <FaShoppingCart size={28} />
          </Link>
          <div className="item-count">{cartItems.length}</div>
        </div>
        <div>
          {user ? (
            <>
              <UserOptions user={user} />
              <button className="logout-button" onClick={logoutHandler}>
                Logout <CiLogout size={24} />
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="login-header">
                Login <CiLogin size={24} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
