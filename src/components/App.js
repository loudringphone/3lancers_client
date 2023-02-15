import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import MyRequests from "../pages/MyRequests";
import MyOffers from "../pages/MyOffers";
import BrowseRequests from "../pages/BrowseRequests";
import Header from "./NavBar/Header";
import Home from "../pages/Home";
import NewRequest from "../pages/NewRequest";
<<<<<<< HEAD
import RequestId from "../pages/RequestId";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditRequest from "../pages/EditRequest";
=======
import RequestDetails from "../pages/RequestDetails";
import MyMessages from "../pages/MyMessages";

>>>>>>> 40471ac (done show message, working on sending message)
const USERS_URL = "http://localhost:3000/users.json";
class App extends Component {
  state = {
    user: {},
    signinError: "",
    signupError: "",
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.id) {
            this.setState({
              user: result,
            });
          }
        });
    }
  }
  signUp = (user) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation,
        },
      }),
    })
      .then(response => response.json())
      .then(user => this.setState({ user: user }))
      .then(() => {
        if (this.state.user.id == null) {
          this.setState({
            signupError: 'Invalid username, email or password',
            signinError: '',
            user: ''
          })
        } else {
          this.setState({ signupError: '', signinError: '' })
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
              if (result.token) {
                localStorage.setItem('token', result.token)
                this.setState({
                  user: result.user
                })
              }
            })





        }
      })
<<<<<<< HEAD
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
=======

>>>>>>> 40471ac (done show message, working on sending message)
  }
  signIn = (user) => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: user.email,
          password: user.password,
        },
      }),
    }).then((response) => response.json()).then((result) => {
      if (result.token) {
        localStorage.setItem("token", result.token);
        this.setState({
          user: result.user,
        });
      } else {
        this.setState({
          signinError: result.error,
          signupError: "",
        });
      }
    }).then(() => {
      window.location.href = '/home'
    })
<<<<<<< HEAD
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          this.setState({
            user: result.user,
          });
          window.location.href = '/home'
        } else {
          this.setState({
            signinError: result.error,
            signupError: "",
          });
        }
      })
  };
=======
  };

>>>>>>> 40471ac (done show message, working on sending message)
  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      user: null
    })
    window.location.href = '/home'
  }
  render() {
    
    setTimeout(() => {
      if (this.state.user.username == null) {
        localStorage.removeItem("token");
      }
    }, 500);
    return (
      <div className="App">
<<<<<<< HEAD
      <BrowserRouter>
        <Header username = { this.state.user.username } />
        <Routes>
        <Route path="" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-offers" element={<MyOffers request={this.state.request} user={this.state.user}/>} />
        <Route path="/my-requests" element={<MyRequests user={this.state.user}/>} />
        <Route path="/requests" element={<BrowseRequests />} />
        <Route path="/requests/:id" element={<RequestId user={this.state.user} />} />
        <Route path="/requests/:id/edit" element={<EditRequest user={this.state.user} />} />
        <Route path="/new-request" element={<NewRequest />} />
        <Route path="/signup" element={<SignUp signUp={this.signUp} signupError={this.state.signupError} user={this.state.user}/>} />
        <Route path="/login" element={<Login signIn={this.signIn} signinError={this.state.signinError} user={this.state.user}/>} />
        </Routes>
      </BrowserRouter>
      {this.state.user.username ? <div><Logout onClick={this.signOut}/><a href={`/users/${this.state.user.username}`}>{`(${this.state.user.username})`}</a></div> : <a href='/login'>login</a>}
      </div>
    );
  }
}
=======
        <BrowserRouter>
          <Header username={this.state.user.username} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/my-offers" element={<MyOffers request={this.state.request} user={this.state.user} />} />
            <Route path="/my-requests" element={<MyRequests user={this.state.user} />} />
            <Route path="/my-messages" element={<MyMessages user_id={this.state.user.id} />} />
            <Route path="/requests" element={<BrowseRequests />} />
            <Route path="/requests/:id" element={<RequestDetails user={this.state.user} />} />
            <Route path="/new-request" element={<NewRequest user_id={this.state.user.id} />} />
            <Route path="/signup" element={<SignUp signUp={this.signUp} signupError={this.state.signupError} user={this.state.user} />} />
            <Route path="/login" element={<Login signIn={this.signIn} signinError={this.state.signinError} user={this.state.user} />} />
          </Routes>
        </BrowserRouter>

        {this.state.user.username ? <div><Logout onClick={this.signOut} /><a href={`/users/${this.state.user.username}`}>{`(${this.state.user.username})`}</a></div> : <a href='/login'>login</a>}

        {this.state.user.username ? <h2>Welcome {this.state.user.username}</h2> : (<></>)}
      </div>
    )
  };


};

>>>>>>> 40471ac (done show message, working on sending message)
export default App;
const Logout = (props) => {
  return (
    <a href="/home" onClick={props.onClick}>Logout </a>
  );
};