import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./NotFound.css";
import { Typography, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon fontSize="large" className="error-icon" />
      <Typography variant="h5" className="error-message">
        Page Not Found
      </Typography>
      <Link component={NavLink} to="/" className="home-link">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
