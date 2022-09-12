import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import axiosServer from "../functions/axiosServer";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userName: "",
      email: "",
      password: "",
      password_conf: "",
      name_field: false,
      userName_field: false,
      email_field: false,
      pass_field: false,
      pass_field_2: false,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.logginFunction = this.logginFunction.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  onChangeField(e) {
    let text = e.target.value;
    let type = e.target.id;
    if (type === "name_field") {
      this.setState({
        name: text,
      });
    }
    if (type === "userName_field") {
      this.setState({
        userName: text,
      });
    }
    if (type === "email_field") {
      this.setState({
        email: text,
      });
    }
    if (type === "pass_field") {
      this.setState({
        password: text,
      });
    }
    if (type === "pass_field_2") {
      this.setState({
        password_conf: text,
      });
    }
  }
  logginFunction = (e) => {
    e.preventDefault();
    let userFirstName = this.state.name;
    let userName = this.state.userName;
    let userEmail = this.state.email;
    let userPass = this.state.password;
    let userPass2 = this.state.password_conf;
    this.setState({
      name_field: false,
      userName_field: false,
      email_field: false,
      pass_field: false,
      pass_field_2: false,
    });
    if (
      userName.length > 0 &&
      userPass.length > 0 &&
      userFirstName.length > 0 &&
      userEmail.length > 0 &&
      userPass2.length > 0
    ) {
      if (userPass === userPass2) {
        this.fetchData();
      } else {
        this.setState({
          pass_field_2: true,
        });
      }
    } else {
      if (!userFirstName.length) {
        this.setState({
          name_field: true,
        });
      }
      if (!userName.length) {
        this.setState({
          userName_field: true,
        });
      }
      if (!userEmail.length) {
        this.setState({
          email_field: true,
        });
      }
      if (!userPass.length) {
        this.setState({
          pass_field: true,
        });
      }
      if (!userPass2.length) {
        this.setState({
          pass_field_2: true,
        });
      }
    }
  };
  fetchData = async () => {
    let url = "register";
    let name = this.state.name;
    let user = this.state.userName;
    let email = this.state.email;
    let password = this.state.password;

    try {
      const resp = await axiosServer.post(url, { email, password, name, user });

      console.log(resp.data);
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  render() {
    // console.log("diego", this.state);
    if (this.props.state && this.props.state.server_response) {
      // this.validateServer();
      this.setState({
        server: this.props.state.server_response,
        userName_field: this.props.state.server_response.userNameExists,
        email_field: this.props.state.server_response.userEmailExists,
      });
    }
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div
              className={`form-group mt-3 ${
                this.state.name_field ? "has-error" : ""
              }`}>
              <label>Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control mt-1"
                placeholder="Jose Perez"
                onChange={this.onChangeField}
                value={this.state.name}
              />
            </div>
            <div
              className={`form-group mt-3 ${
                this.state.userName_field ? "has-error" : ""
              }`}>
              <label>Username</label>
              <input
                type="user"
                id="userName_field"
                className="form-control mt-1"
                placeholder="taquitoDePastor"
                onChange={this.onChangeField}
                value={this.state.userName}
              />
            </div>
            <div
              className={`form-group mt-3 ${
                this.state.email_field ? "has-error" : ""
              }`}>
              <label>Email address </label>
              <input
                type="email"
                id="email_field"
                className="form-control mt-1"
                placeholder="example@example.com"
                onChange={this.onChangeField}
                value={this.state.email}
              />
            </div>
            <div
              className={`form-group mt-3 ${
                this.state.pass_field ? "has-error" : ""
              }`}>
              <label>Password</label>
              <input
                type="password"
                id="pass_field"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={this.onChangeField}
                value={this.state.password}
              />
            </div>
            <div
              className={`form-group mt-3 ${
                this.state.pass_field_2 ? "has-error" : ""
              }`}>
              <label>Re-enter your Password</label>
              <input
                type="password"
                id="pass_field_2"
                className="form-control mt-1"
                placeholder="Confirm password"
                onChange={this.onChangeField}
                value={this.state.password_conf}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.logginFunction}>
                Submit
              </button>
            </div>
            <div className="flex between">
              <p className="forgot-password mt-2">
                <Link to="/">Log In</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
