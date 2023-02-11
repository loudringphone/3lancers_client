import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



class Header extends Component {

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
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
      </nav>
    );
  }
}

export default Header;


