import { Component } from "react";

export default class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.signUp(this.state)
    }



    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Sign Up Form</h1>
                <label>Username :</label>
                <input name='username' value={this.state.username} onChange={this.handleChange} />
                <label>Email :</label>
                <input name='email' value={this.state.email} onChange={this.handleChange}/>
                <label>Password :</label>
                <input name='password' value={this.state.password} onChange={this.handleChange} type='password' />
                <label>Password Confirmation :</label>
                <input name='password_confirmation' value={this.state.password_confirmation} onChange={this.handleChange} type='password' />
                {this.props.signupError ? <p style={{color: 'red'}}>{this.props.signupError}</p> : null}
                <input type="submit" value='REGISTER' />
            </form>
        )
    }
}

