import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Table from './Table'
import Details from './Details'

import AuthService from "./services/auth.service";
import CustomerService from "./services/customer.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      users: [],
      oneUser: {}
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    this.getCustomer()
  }

  logOut() {
    AuthService.logout();
  }
  getCustomer = () => {
    // Axios Use
    //const url = "http://localhost:8000/api/customers";
    // fetch(url)
    //   .then((result) => result.json())
    //.then((data) => this.setState({ users: data }))
    CustomerService.getCustomers()
      .then((result) => this.setState({ users: result.data }))
      .catch((error) => console.log(error.message));
  };

  getOneCustomer = (id) => {
    console.log("getonecustomer çalıştı")
    const url = `http://localhost:8000/api/customers/${id}`;
    fetch(url)
      .then(result => result.json())
      .then(data => this.setState({oneUser:data}))
      .catch(error => console.log(error.message))
  }
  updateCustomer = (data, id) => {
    //console.log("updatecustomer çalıştı")
    const url = `http://localhost:8000/api/customers/${id}`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(url,requestOptions)
      .then(result => result.json())
      .then(data => console.log(data))
      .catch(error => console.log(error.message))
  }
  

  handleSubmit = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:8000/api/customers', requestOptions)
      .then(response => response.json())
      .then(data => {console.error(data)
      this.getCustomer()})
      .catch(error => console.log(error.message))
  }

  handleDelete = (id) => {
    console.log("handleDelete çalıştı")
    const url = `http://localhost:8000/api/customers/${id}`;
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(url, requestOptions)
      .then(result => this.getCustomer())
      .catch(error => console.log(error.message)); 
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            {/* <Route exact path={["/", "/home"]} component={Home} /> */}
            <Route
              exact
              path={["/", "/home"]}
              render={(props) => <Table {...props} state={this.state} getOneCustomer={this.getOneCustomer} handleDelete={this.handleDelete}/>}
            />
            <Route path="/home/:id" render={(props) => (
                    <Details {...props} oneUser={this.state.oneUser}   state={this.state} getOneCustomer={this.getOneCustomer} updateCustomer={this.updateCustomer}/>
                    )} />


            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route 
            exact
            path="/user"
            render={(props) => <BoardUser {...props} handleSubmit={this.handleSubmit} />}
            />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;