import { NavLink } from 'react-router-dom';
import React from "react";
import { useJwt } from "react-jwt";


const NavLinks = (props) => {
    const token = localStorage.getItem('token');
    let existingToken = 'none'
    if (token) {existingToken = token}
    const {decodedToken, isExpired } = useJwt(existingToken);
    let username
    let user_id
    if (decodedToken) {
        username = decodedToken.username
        user_id = decodedToken.user_id
    }
    
    if (!token){
        return (
            <ul id='mobNavLinks'>
                <li onClick={() => props.isMobile && props.closeMobileMenu()}>
                    <NavLink to="/requests">Browse requests</NavLink>
                </li>
                <li onClick={() => props.isMobile && props.closeMobileMenu()}>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li onClick={() => props.isMobile && props.closeMobileMenu()}>
                    <NavLink to="/signup">Sign up</NavLink>
                </li>
            </ul>
        )
    }
    else {
        return (
            <ul id='mobNavLinks'>
                <li onClick={() => props.isMobile && props.closeMobileMenu()}>
                    <NavLink to="/requests">Browse requests</NavLink>
                </li>
                <li onClick={() => props.isMobile && props.closeMobileMenu()}>
                    <NavLink to="/my-requests">My requests</NavLink>
                </li>
                <li onClick={() => props.isMobile && props.closeMobileMenu()}>
                    <NavLink to="/my-offers">My offers</NavLink>
                </li>
                <li style={{ display: 'inline-flex' }} onClick={() => props.isMobile && props.closeMobileMenu()}>
                    <Logout/><a href={"/users/"+user_id}>({username})</a>
                </li>
            </ul>
        )
    }
}

export default NavLinks


const Logout = (props) => {
    let signOut = () => {
        localStorage.removeItem("token");
        window.location.href = '/home'
      }
    return (
      <a href="/home" onClick={signOut}>Logout </a>
    );
  };