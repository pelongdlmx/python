import React, { useState, useEffect } from "react";
import axiosServer from "../functions/axiosServer";
import { Link } from "react-router-dom";
// import { Icon } from "@mui/material";

function bodyTable() {
  return (
    <tr>
      <td className="name">John Doe</td>
      <td className="user">test</td>
      <td className="email">example@hotmail.com</td>
      <td className="pass">pass goes here</td>
      <td className="pass">date goes here</td>
      <td className="actions">actions goes here</td>
    </tr>
  );
}

function Users() {
  const [user, setUser] = useState("");

  const logout = async () => {
    await axiosServer.post("logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await axiosServer.get("user");
        setUser(resp.data);
      } catch (error) {
        console.log("Not autheticated");
      }
    })();
  }, []);

  return (
    <div className="container">
      <h3 className="title">Users:</h3>
      {user && user.id && user.id != null ? (
        <div className="container-lg">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-md-8">
                    <h2>Data</h2>
                  </div>
                  <div className="col-md-4">
                    <button type="button" className="btn btn-info add-new">
                      <i className="fa fa-plus"></i> Add New
                    </button>
                  </div>
                </div>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Pass</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{bodyTable()}</tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-info add-new"
                onClick={logout}>
                <i className="fa fa-plus"></i> Log out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Link to="/">Log in</Link>
      )}
    </div>
  );
}

export default Users;
