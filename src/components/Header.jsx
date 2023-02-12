import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



class Header extends Component {
  signOut = () => {
    localStorage.removeItem('token')
    this.setState({
        user: null
        })
  }

  render() {

    return (
      <nav className="header">
          <div className="logo">
            <a href="/home"><h1>3Lancers</h1></a>
          </div>
          <div className="header-elements">
            <ul>
              <li>
                <NavLink to="/requests">Browse requests</NavLink>
              </li>
              <li>
                <NavLink to="/my-requests">My requests</NavLink>
              </li>
              <li>
                <NavLink to="/my-offers">My offers</NavLink>
              </li>
              <li>
              {this.props.username ? <div><Logout onClick={this.signOut}/><a href={`/users/${this.props.username}`}>{`(${this.props.username})`}</a></div> : <NavLink to="/login">Login</NavLink>}
                
              </li>
            </ul>
          </div>
      </nav>
    );
  }
}

export default Header;

const Logout = () => {
  return (
    <a href="/logout">Logout </a>
  );
};
