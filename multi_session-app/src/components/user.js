import React, { useState, useEffect } from "react";
import axiosServer from "../functions/axiosServer";
import { Link } from "react-router-dom";
import SignIn from "./signin";
// import { Icon } from "@mui/material";

function bodyTable(data, admin) {
  let bodyTable = data.map((info, index) => {
    return (
      <tr key={index}>
        {admin ? (
          <td className="admin_user">
            {info["admin_user"] === true ? "Yes" : "No"}
          </td>
        ) : (
          ""
        )}
        <td className="username">{info["username"]}</td>
        <td className="name">{info["name"]}</td>
        <td className="email">{info["email"]}</td>
        <td className="date_added">{info["date_added"]}</td>
        <td className="actions"></td>
      </tr>
    );
  });
  return bodyTable;
}

function Users() {
  const [user, setUser] = useState("");
  const [data, setData] = useState();

  const logout = async () => {
    await axiosServer.post("logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await axiosServer.get("user");
        setUser(resp.data);
        setData(resp.data.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  console.log("diego user", user.admin);
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
                  {user.admin ? (
                    <div className="col-md-4">
                      <button type="button" className="btn btn-info add-new">
                        <i className="fa fa-plus"></i> Add New
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {user.data && user.admin ? <th>Admin</th> : null}
                    <th>User</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length ? bodyTable(data, user.admin) : null}
                </tbody>
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

      {<SignIn admin={user.admin} />}
    </div>
  );
}

export default Users;
