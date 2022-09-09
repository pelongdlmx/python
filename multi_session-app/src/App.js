import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import bcrypt from "bcryptjs";
import React, { PureComponent } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  renderMatches,
  Redirect,
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import SignIn from "./components/signin";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      server_response: "",
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = (type, url, name, userName, email, pass) => {
    let type_of_request = type;
    let route = url;
    let userFirstName = name;
    let userOtherName = userName;
    let user_email = email;
    let hashedPassword = bcrypt.hashSync(pass, "$2a$10$CwTycUXWue0Thq9StjUM0u");
    let title = "Request to Flask Sever";

    const requestOptions = {
      method: type_of_request,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        name: type_of_request === "POST" ? userFirstName : null,
        user_name: type_of_request === "POST" ? userOtherName : null,
        user_email: user_email,
        user_pass: hashedPassword,
      }),
    };
    fetch(route, requestOptions)
      .then((response) => response.json())
      .then(
        (data) => (
          console.log(data),
          this.setState({
            server_response: data,
          })
        )
      );
  };
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/"
            element={<Login fetchData={this.fetchData} state={this.state} />}
          />

          <Route
            path="/sign-in"
            element={
              this.state.server_response &&
              this.state.server_response === "Success" ? (
                <Navigate replace to="/" />
              ) : (
                <SignIn fetchData={this.fetchData} state={this.state} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
