import React, { Component, useState } from 'react';
import axios from 'axios';
// import { NavLink } from 'react-router-dom'

const LOGIN_URL = 'http://localhost:3000/auth/login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: ''
        };
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    };
    handleSubmit = (event) => {
        event.preventDefault()
        const { username, email, password } = this.state
        let user = {
            username: username,
            email: email,
            password: password
        }
        axios.post(LOGIN_URL, { user }, { withCredentials: true })
            .then(response => {
                if (response.data.logged_in) {
                    this.props.handleLogin(response.data)
                    console.log(response)
                    this.redirect()
                } else {
                    this.setState({
                        errors: response.data.errors
                    })
                }
            })
            .catch(error => console.log('api errors:', error))
    };
    redirect = () => {
        this.props.history.push('/')
    }
    handleErrors = () => {
        return (
            <div>
                <ul>
                    {this.state.errors.map(error => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
            </div>
        )
    };

    render() {
        const { username, email, password } = this.state
        return(
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <button placeholder="submit" type="submit">
                        Log In
                    </button>
                    {/* <div>
                        or <NavLink to='/signup'>sign up</NavLink>
                    </div> */}

                </form>
            </div>
        );
        return
    }
}

export default Login;
