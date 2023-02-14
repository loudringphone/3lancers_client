import { NavLink } from 'react-router-dom';

const NavLinks = (props) => {
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
        </ul>
    )
}

export default NavLinks