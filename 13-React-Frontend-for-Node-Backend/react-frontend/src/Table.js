import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

class Table extends Component {
  render() {
    console.log(this.props);
    const { currentStaff } = this.props;
    return (
      <div>
        <p>Add a character with a name and a job to the table.</p>
        <Form handleSubmit={this.props.handleSubmit} />
        <div className="container-md" style={{ width: "55rem" }}>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link
                        to={"/customer/" + item.id}
                        key={item.id}
                        onClick={() => this.props.getOneCustomer(item.id)}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.city}</td>
                    <td>{item.isActive ? "Active" : "Inactive"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
