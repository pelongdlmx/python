import React, { PureComponent } from "react";
// import { Link } from "react-router-dom";
// import { Icon } from "@mui/material";

class Users extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email_userName: "",
    };
  }

  componentDidMount() {
    this.props.fetchData("GET", "/user", null, null, null, null);
  }

  bodyTable = () => {
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
  };
  render() {
    return (
      <div className="container">
        <h3 className="title">Users:</h3>
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
                <tbody>{this.bodyTable()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
