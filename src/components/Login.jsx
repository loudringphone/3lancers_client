import { Component } from "react";

export default class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.signIn(this.state)
    }

    render() {
        if (this.props.user.username) {
            return (window.location.href = '/home')
        }
        else {
        
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <label>Email address</label>
                        <input name='email' value={this.state.email} onChange={this.handleChange}/>
                        <label>Password</label>
                        <input type="password" name='password' value={this.state.password} onChange={this.handleChange}/>
                        {this.props.signinError ? <p style={{color: 'red'}}>{this.props.signinError}</p> : null}
                        <input type="submit" value="Login"/>
                    </form>
                    <p>Don't have an account yet?</p>
                    <button><a href="/signup">Sign Up</a></button>
                </div>
            )
            }
    }

}