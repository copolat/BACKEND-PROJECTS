import React, { Component } from "react";
import { Link } from "react-router-dom";


class Table extends Component {
  render() {
    console.log(this.props);
    const { currentStaff } = this.props;
    return (
      <div>
        <p>Add a character with a name and a job to the table.</p>
        <div className="container-md" style={{ width: "55rem" }}>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.state.users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link
                        to={"/home/" + item.id}
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
                    <td>
                      {this.props.state.showAdminBoard ? 
                      <button
                      className="btn btn-remove"
                      onClick={() => this.props.handleDelete(item.id)}
                    >
                      Delete
                    </button> : ''
                      }
                      
                    </td>

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
