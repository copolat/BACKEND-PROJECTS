import React from "react";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      city: "",
      isActive: true,
    };
    this.initialState = this.state;
  }
  componentDidMount(){
    const { name, email, city, phone } = this.props.currentUser;
    this.setState({
      name: name,
      email: email,
      city: city,
      phone:phone,
      isActive: true,
    });
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = (event) => {
    const id = this.props.match.params.id;
    event.preventDefault();
    console.log(this.state);
    this.props.updateCustomer(this.state, id);
    this.setState(this.initialState);
    window.location='/';
  };

  render() {
    //console.log(this.props.currentUser)
    const { name, email, city, phone } = this.props.currentUser;
    return (
      <div className="container" style={{ width: "22rem" }}>
          <p>Update Staff</p>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="name">Customer</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={email}
            onChange={this.handleChange}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            defaultValue={phone}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={this.handleChange}
          />
          <small>Format: 123-456-7890</small>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            defaultValue={city}
            onChange={this.handleChange}
          />
          <button type="submit">Update</button>
        </form>
        <h2>
          {this.state.name
            ? `entered customer values are : ${this.state.name} , ${this.state.email} and ${this.state.city}`
            : ""}
        </h2>
      </div>
    );
  }
}

export default Details;
