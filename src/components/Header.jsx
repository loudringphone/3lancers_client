import React, { Component, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from "./Hamburger";

// const [hamburgerOpen, setHamburgerOpen] = useState(false);

class Header extends Component {


// const toggleHamburger = () => { setHamburgerOpen(!hamburgerOpen) }

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
                <button id="round-6" href="/my-offers">+</button>
              </li>

            </ul>
            {/* <div className="hamburger" onClick={toggleHamburger}>
              <Hamburger />
            </div> */}
          </div>
      </nav>
    );
  }
}

// function NavLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to)
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true  })

//   return (
//       <li className={isActive ? "active" : ""}>
//           <Link to={to} {...props}>
//               {children}
//           </Link>
//       </li>
//   );
// };

export default Header;


