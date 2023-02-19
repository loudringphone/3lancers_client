import { Component } from "react";
import axios from 'axios'
import { Helmet } from "react-helmet";

import { SERVER_URL } from "../components/SERVER_URL"

const USERS_URL = SERVER_URL + 'users.json'

export default class SignUp extends Component {
    

    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            users: {},
            signupError1: '',
            signupError2: '',
            signupError3: '',
            signupError4: '',
            signupError5: ''
        }
    }

    componentDidMount() {
        const fetchUsers = () => {
            axios.get(USERS_URL).then((response) => {
                this.setState({ users:response.data })
                setTimeout(fetchUsers, 10000)
            })
        }
        fetchUsers()
    }











    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({signupError: null})
        this.props.signUp(this.state)
        for (let user of this.state.users){
            if (user.username === this.state.username) {
                this.setState({signupError1: "Username has already been taken"})
            }
            const letterNumberRegex = /^[0-9a-zA-Z]+$/
            if (!letterNumberRegex.test(this.state.username)) {
                this.setState({signupError2: "Username can only contain letters and numebrs"})
            }

            if (user.email === this.state.email) {
                this.setState({signupError3: "Email address has already been taken"})
            }
            const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            if (!this.state.email.includes("@") || !emailRegex.test(this.state.email)) {
                this.setState({signupError4: "Email address must be in the format of 'user@example.com'"})
            }
            if (!this.state.password != this.state.password_confirmation) {
                this.setState({signupError5: "Password and confirm password do not match"})
            }
        }
    }



    render() {
        if (localStorage.getItem('token')) {
            return (window.location.href = '/home')
        }
        else {
            return (
                <div>
                    <Helmet>
                        <title>3lancers | Signup</title>
                    </Helmet>
                    <form onSubmit={this.handleSubmit}>
                        <h1 className='signupTitle'>Sign up</h1>
                        <div className='signup'>
                            <label>Username</label>
                            <input name='username' value={this.state.username} onChange={this.handleChange} required />
                            <label>Email address</label>
                            <input name='email' value={this.state.email} onChange={this.handleChange} required />
                            <label>Password</label>
                            <input name='password' value={this.state.password} onChange={this.handleChange} type='password' required />
                            <label>Confirm password</label>
                            <input name='password_confirmation' value={this.state.password_confirmation} onChange={this.handleChange} type='password' required />
                            {this.state.signupError1? <p className='error' style={{color: 'red'}}>{this.state.signupError1}</p>: null}
                            {this.state.signupError2? <p className='error' style={{color: 'red'}}>{this.state.signupError2}</p>: null}
                            {this.state.signupError3? <p className='error' style={{color: 'red'}}>{this.state.signupError3}</p>: null}
                            {this.state.signupError4? <p className='error' style={{color: 'red'}}>{this.state.signupError4}</p>: null}
                            {this.state.signupError5? <p className='error' style={{color: 'red'}}>{this.state.signupError5}</p>: null}
                            <input className='signupBtn' type="submit" value='Sign up' />
                        </div>
                    </form>
                </div>
            )
        }
    }
}

