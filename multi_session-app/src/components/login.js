import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

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
    this.setState({
      email_field: false,
      pass_field: false,
    });
    if (userName.length > 0 && userPass.length > 0) {
      this.fetchData();
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
    let type = "POST";
    let url = "/login";
    let email = this.state.email_userName;
    let pass = this.state.password;

    // this.props.fetchData(url, pass, email, type);
    this.props.fetchData(type, url, null, null, email, pass);
  };
  render() {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div
              className={`form-group mt-3 ${
                this.state.email_field ? "has-error" : ""
              }`}>
              <label>Email address </label>
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
            <div className="flex between">
              <p className="forgot-password mt-2">
                <Link to="/sign-in">Sign in</Link>
              </p>
              <p className="forgot-password  mt-2">
                <a>Forgot password?</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
