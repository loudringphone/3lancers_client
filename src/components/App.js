import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'

import SignUp from './SignUp';
import Login from './Login';


import MyRequests from '../pages/MyRequests';
import MyOffers from '../pages/MyOffers';
import BrowseRequests from '../pages/BrowseRequests';
import Header from './Header';
import Home from '../pages/Home';

const USERS_URL = 'http://localhost:3000/users.json'

class App extends Component {

  state = {
    user: {}, 
    signinError: "",
    signupError: ""
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      fetch('http://localhost:3000/profile', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(result => {
        if(result.id){
          this.setState({
            user: result
          })
        }
      })
    }
  }

  signUp = user => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user:{
          username: user.username,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation
        }
      })
    })
    .then(response => response.json())
    .then(user => this.setState({ user: user }) )
    .then(() =>{if (this.state.user.id == null) {
      this.setState({
        signupError: 'Invalid username, email or password',
        signinError: '',
        user: ''
    })
    } else {
      this.setState({signupError: '', signinError: ''})
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                email: user.email
            }
        })
      })
      .then(response => response.json())
      .then(result => {
          if (result.token){
          localStorage.setItem('token', result.token)
          this.setState({
              user: result.user
              })
          }
      })
    
    
    
    
    
    }
    })
    
  }

  signIn = (user) => {
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                email: user.email,
                password: user.password
            }
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.token){
        localStorage.setItem('token', result.token)
        this.setState({
            user: result.user
            })
        }
        else {
            this.setState({
              signinError: result.error,
              signupError: ''
            })
        }
    })
  }

  signOut = () => {
    localStorage.removeItem('token')
    this.setState({
        user: null
        })
  }
  
    
  render() {
 
    return (
      
      <div className="App">
      <BrowserRouter>
        {/* <Header username = { this.state.user.username } /> */}
        <Routes>
        <Route path="/signup" element={<SignUp user={this.state.user} signupError={this.state.signupError}/>} />
        <Route path="/login" element={<Login user={this.state.user} signIn={this.signIn} signinError={this.state.signinError}/>} />
        </Routes>


      </BrowserRouter>



      {this.state.user.username ? <div><Logout onClick={this.signOut}/><a href={`/users/${this.state.user.username}`}>{`(${this.state.user.username})`}</a></div> : <a href='/login'>login</a>}

        
        


        

        {this.state.user.username ? <h2>Welcome {this.state.user.username}</h2> : (
          <>
          </>)
        }
      </div>
    );
  } 
}

export default App;


const Logout = (props) => {
  return (
    <a href="/logout" onClick={props.onClick}>Logout </a>
  );
};