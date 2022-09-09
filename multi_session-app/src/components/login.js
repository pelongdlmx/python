import React, { PureComponent } from "react";
import bcrypt from "bcryptjs";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email_userName: "",
      password: "",
      email_field: false,
      pass_field: false,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.logginFunction = this.logginFunction.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  onChangeField(e) {
    let text = e.target.value;
    let type = e.target.type;

    switch (type) {
      case "email":
        this.setState({
          email_userName: text,
        });
        break;
      case "password":
        this.setState({
          password: text,
        });
        break;
      default:
        break;
    }
  }
  logginFunction = (e) => {
    e.preventDefault();
    let userName = this.state.email_userName;
    let userPass = this.state.password;
    if (userName.length > 0 && userPass.length > 0) {
      this.fetchData();
      this.setState({
        email_field: false,
        pass_field: false,
      });
    } else {
      if (!userName.length) {
        this.setState({
          email_field: true,
        });
      }
      if (!userName.length) {
        this.setState({
          pass_field: true,
        });
      }
    }
  };
  fetchData = () => {
    let url = "/login-newuser";
    // const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(
      this.state.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    console.log("diego fecth", hashedPassword);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Login",
        user: this.state.email_userName,
        password: hashedPassword,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  render() {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div
              className={`form-group mt-3 ${
                this.state.email_field ? "has-error" : ""
              }`}>
              <label>Email address / Username</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email / Username"
                onChange={this.onChangeField}
                value={this.state.email_userName}
              />
            </div>
            <div
              className={`form-group mt-3 ${
                this.state.pass_field ? "has-error" : ""
              }`}>
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={this.onChangeField}
                value={this.state.password}
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
            {/* <p className="forgot-password text-right mt-2">
              Forgot <a>password?</a>
            </p> */}
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
