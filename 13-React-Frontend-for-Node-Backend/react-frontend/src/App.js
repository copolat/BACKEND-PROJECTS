import React, { Component } from 'react';
import Table from "./Table";
import { Route, Redirect, Switch} from "react-router-dom";
import Details from "./Details";
import NotFound from "./NotFound";
import Login from "./Login";

class App extends Component {
constructor(props) {
  super(props)
  this.state = {
     users : [],
     currentUser : {},
     token: ''
  }
}

componentDidMount=()=> {
  console.log("bu didmount başlangıçta state'i güncelliyor")
  this.getCustomer();
  this.setState({token:this.getToken()});
  setTimeout(() => {
    localStorage.clear()
  }, 100000);
}

getCustomer = () => {
  const url = 'http://localhost:8000/api/customers';
  fetch(url)
    .then(result => result.json())
    .then(data => this.setState({users:data}))
    .catch(error => console.log(error.message))
}

getOneCustomer = (id) => {
  console.log("getonecustomer çalıştı")
  const url = `http://localhost:8000/api/customers/${id}`;
  fetch(url)
    .then(result => result.json())
    .then(data => this.setState({currentUser:data}))
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
    .then(data => this.setState({users : [...this.state.users, data]}))
    .catch(error => console.log(error.message))
}

updateCustomer = (data ,id) => {
  console.log(data);
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  fetch(`http://localhost:8000/api/customers/${id}`, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error.message))
}
handleDelete = (id) => {
  fetch(`http://localhost:8000/api/customers/${id}`, { method: 'DELETE' })
    .then(data => { 
      console.log(data);
      this.getCustomer() }
      )
    .catch(error => console.log(error.message))
}
getToken = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
};


setToken=(value)=>{
localStorage.setItem('token', JSON.stringify(value));
this.setState({token:value})
}


    render() {
      if(!this.state.token) {
        return <Login setToken={this.setToken} />
      }
      //console.log(this.state.currentUser)
        return (
            <div className="container text-center">
                <h1>React List</h1>
                
                <Switch>
                  <Route exact path="/customer" render={(props) => (
                    <Table {...props} users={this.state.users} currentUser={this.state.currentUser} getOneCustomer={this.getOneCustomer} handleSubmit={this.handleSubmit} handleDelete= {this.handleDelete} />
                    )} />
                  <Redirect exact to="/customer" from="/"></Redirect>
                  <Route path="/customer/:id" render={(props) => (
                    <Details {...props} currentUser={this.state.currentUser} updateCustomer={this.updateCustomer} getOneCustomer={this.getOneCustomer}/>
                    )} />
                  <Route path="*" component={NotFound} />
                </Switch>
            </div>
        )
      }
}

export default App;