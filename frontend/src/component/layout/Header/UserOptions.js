import React, { Fragment, useState } from "react";
import "./user.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import ProfileImage from "./Profile.png";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", route: "/orders" },
    { icon: <PersonIcon />, name: "Profile", route: "/account" },
    {
      icon: <ShoppingCartIcon />,
      name: `Cart(${cartItems.length})`,
      route: "/cart",
    },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      route: "/admin/dashboard",
    });
  }

  const handleActionClick = (route) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <Fragment>
      <Backdrop open={open} className="backdrop" />
      <SpeedDial
        ariaLabel="User options"
        className="speedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={<img className="speedDialIcon" src={ProfileImage} alt="Profile" />}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={() => handleActionClick(item.route)}
            className="speedDialAction"
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
