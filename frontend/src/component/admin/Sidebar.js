import React, { useState } from "react";
import "./sidebar.css";
import logo from "../../images/logo.jpg";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { GrUserAdmin } from "react-icons/gr";
import { IoMdContacts } from "react-icons/io";
import { FcAbout } from "react-icons/fc";

const Sidebar = () => {
  const [isProductsOpen, setProductsOpen] = useState(false);

  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
  };

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" className="sidebar-logo" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <div className="sidebar-item">
        <p
          className={`sidebar-item-header ${isProductsOpen ? "" : "collapsed"}`}
          onClick={toggleProducts}
        >
          <ImportExportIcon /> Products
        </p>
        <div className={`sidebar-submenu ${isProductsOpen ? "open" : ""}`}>
          <Link to="/admin/products" className="sidebar-submenu-item">
            <PostAddIcon /> All
          </Link>
          <Link to="/admin/product" className="sidebar-submenu-item">
            <AddIcon /> Create
          </Link>
        </div>
      </div>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/payment">
        <p>
          <GrUserAdmin />
          Admin Payment
        </p>
      </Link>
      <Link to="/admin/contact">
        <p>
          <IoMdContacts />
          Admin Contact
        </p>
      </Link>
      <Link to="/admin/about-us">
        <p>
          <FcAbout />
          Admin About
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
