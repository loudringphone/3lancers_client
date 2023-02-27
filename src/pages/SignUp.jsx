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
            signupError0: '',
            signupError1: '',
            signupError2: '',
            signupError3: '',
            signupError4: '',
            signupError5: '',
            signupError6: ''
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
            if (this.state.username.length < 3) {
                this.setState({signupError0: "Username is too short (minimum is 3 characters)"})
            } else {this.setState({signupError0: null})}
            if (this.state.username.length > 15) {
                this.setState({signupError1: "Username is too long (maximum is 15 characters)"})
            } else {this.setState({signupError1: null})}
            if (user.username === this.state.username) {
                this.setState({signupError2: "Username has already been taken"})
            } else {this.setState({signupError2: null})}
            const letterNumberRegex = /^[0-9a-zA-Z]+$/
            if (!letterNumberRegex.test(this.state.username)) {
                this.setState({signupError3: "Username must contain at least one letter and cannot contain any special characters"})
            } else {this.setState({signupError3: null})}
            if (user.email === this.state.email) {
                this.setState({signupError4: "Email address has already been taken"})
            } else {this.setState({signupError4: null})}
            const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            if (!this.state.email.includes("@") || !emailRegex.test(this.state.email)) {
                this.setState({signupError5: "Email address must be in the format of 'user@example.com'"})
            } else {this.setState({signupError5: null})}
            if (this.state.password != this.state.password_confirmation) {
                this.setState({signupError6: "Password and confirm password do not match"})
            } else {this.setState({signupError6: null})}
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
                        <title>3Lancers | Signup</title>
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
                            {this.state.signupError0? <p className='signupError'>{this.state.signupError0}</p>: null}
                            {this.state.signupError1? <p className='signupError'>{this.state.signupError1}</p>: null}
                            {this.state.signupError2? <p className='signupError'>{this.state.signupError2}</p>: null}
                            {this.state.signupError3? <p className='signupError'>{this.state.signupError3}</p>: null}
                            {this.state.signupError4? <p className='signupError'>{this.state.signupError4}</p>: null}
                            {this.state.signupError5? <p className='signupError'>{this.state.signupError5}</p>: null}
                            {/* {this.props.signupError? <p className='signupError'>{this.props.signupError}</p>: null} */}
                            {this.state.signupError6? <p className='signupError'>{this.state.signupError6}</p>: null}
                            <input className='signupBtn' type="submit" value='Sign up' />
                        </div>
                    </form>
                </div>
            )
        }
    }
}

