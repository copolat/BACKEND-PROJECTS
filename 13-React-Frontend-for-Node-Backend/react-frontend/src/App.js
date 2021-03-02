import React, { Component } from 'react';
import Table from "./Table";
import { Route, Redirect, Switch} from "react-router-dom";
import Details from "./Details";
import NotFound from "./NotFound";

class App extends Component {
constructor(props) {
  super(props)
  this.state = {
     users : [],
     currentUser : {}
  }
}

componentDidMount=()=> {
  console.log("bu didmount başlangıçta state'i güncelliyor")
  this.getCustomer();
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

    render() {
      //console.log(this.state.currentUser)
        return (
            <div className="container text-center">
                <h1>React List</h1>
                
                <Switch>
                  <Route exact path="/customer" render={(props) => (
                    <Table {...props} users={this.state.users} currentUser={this.state.currentUser} getOneCustomer={this.getOneCustomer} handleSubmit={this.handleSubmit}/>
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