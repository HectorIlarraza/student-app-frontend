import React, { useState } from 'react';
import { Link } from  "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {

  const [showNavbarItems, setShowNavbarItems] = useState(false);
  
  return (
    <div className='navbar'>
      <div className='navbar__links'>
        <div className='navbar__logo' >
          <Link to="/">
            Student App
          </Link>
        </div>
        <div className='navbar__menuItems'>
            <li className='navbar__menuItem'>
              <Link to="/">Students</Link>
            </li>
            <li className='navbar__menuItem'>
              <Link to="/about">About</Link>
            </li>
            <li className='navbar__menuItem'>
              <Link to="/contact">Contact</Link>
            </li>
        </div>
        <div className='navbar__toogleIcon'>=</div>
      </div>
    </div>
  )
}

export default Navbar;