import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profile
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message, navigate]);

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <table className="productListTable">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td className={user.role === "admin" ? "greenColor" : "redColor"}>
                      {user.role}
                    </td>
                    <td>
                      <Link to={`/admin/user/${user._id}`}>
                        <EditIcon />
                      </Link>
                      <Button onClick={() => deleteUserHandler(user._id)}>
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
