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
        if (localStorage.getItem('token')) {
            return (window.location.href = '/home')
        }
        else {
        
            return (
                <div><h1 className='signupTitle'>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        
                        <div className='signup'>
                            <label>Email address</label>
                            <input name='email' value={this.state.email} onChange={this.handleChange}/>
                            <label>Password</label>
                            <input type="password" name='password' value={this.state.password} onChange={this.handleChange}/>
                            {this.props.signinError ? <p style={{color: 'red'}}>{this.props.signinError}</p> : null}
                            <input className='loginBtn' type="submit" value="Login"/>
                            <p className='loginMsg'>Don't have an account yet?</p>
                            <button className='signupBtn'><a className='signupBtnTag' href="/signup">Sign Up</a></button>
                        </div>
                    </form>

                </div>
            )
            }
    }

}
