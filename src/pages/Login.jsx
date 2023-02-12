import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logInUser } from "../actions/userActions";

class Login extends Component {
	state = {
		email: "",
		password: ""
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.logInUser(this.state);
		this.setState({ email: "", password: "" });
	};

	render() {
		return (
			<div className="login-page">
				<div className="login-signup">
					<div className="login-signup-container">
						<div className="title">Log In</div>
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								placeholder="Email Address"
								name="email"
								onChange={this.handleChange}
								value={this.state.email}
							/>
							<input
								type="password"
								placeholder="Password"
								name="password"
								onChange={this.handleChange}
								value={this.state.password}
							/>
							<button type="submit">Log In</button>
						</form>
						<div className="alt">
							Don't have an account?{" "}
							<NavLink to="/signup" className="link">
								Sign Up
							</NavLink>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return { logInUser: (userInfo) => dispatch(logInUser(userInfo)) };
};

export default connect(null, mapDispatchToProps)(Login);