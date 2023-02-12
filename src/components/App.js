import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './SignUp';
import Login from './Login';

import MyRequests from '../pages/MyRequests';
import MyOffers from '../pages/MyOffers';
import BrowseRequests from '../pages/BrowseRequests';
import Header from './Header';
import Home from '../pages/Home';



class App extends Component {

  state = {
    user: {}, 
    error: "",
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
          password: user.password,
          first_name: user.firstName,
          last_name: user.lastName
        }
      })
    })
    .then(response => response.json())
    .then(user => this.setState({ user: user }) )
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
                username: user.username,
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
                error: result.error
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
      <Header username = { this.state.user.username } />



      </BrowserRouter>

      <Logout onClick={this.signOut}/><a href={`/users/${this.state.user.username}`}>{`(${this.state.user.username})`}</a>
        
        




        {this.state.user.username ? <h2>Welcome {this.state.user.username}</h2> : (
          <>
          <Login signIn={this.signIn} error={this.state.error} />
          <SignUp signUp={this.signUp} />
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