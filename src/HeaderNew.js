import React, { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Link, NavLink } from 'react-router-dom';
import logo from 'assets/default-monochrome-white.svg';
import { FaBars, FaCaretDown, FaTimes } from 'react-icons/fa';

const HeaderNew = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    setDropdown(!dropdown);
    // window.innerWidth < 960 ? setDropdown(false) : setDropdown(!dropdown);
  };

  const onMouseLeave = () => {
    setDropdown(false);
    // window.innerWidth < 960 ? setDropdown(false) : setDropdown(false);
  };

  return (
    <>
      <nav className="navbar-n">
        <Link to="/" className="nav-bar-logo">
          <img src={logo} alt="logo" className="nav-logo" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? 'navbar-menu active' : 'navbar-menu'}>
          <li className="navbar-item">
            <Link to="/" className="navbar-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className="navbar-item manage"
            onClick={onMouseEnter}
            // onMouseLeave={onMouseLeave}
          >
            <Link to="" className="navbar-links">
              Manage
              <FaCaretDown />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <div className="manage-items">
            <li className="navbar-item">
              <NavLink
                to="/rentals/manage"
                exact
                className="navbar-links"
                onClick={closeMobileMenu}
              >
                Manage Rental
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink
                to="/bookings/manage"
                exact
                className="navbar-links"
                onClick={closeMobileMenu}
              >
                Manage Booking
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink
                to="/bookings/received"
                exact
                className="navbar-links"
                onClick={closeMobileMenu}
              >
                Received Booking
              </NavLink>
            </li>
          </div>
          <li className="navbar-item">
            <Link
              to="/about"
              className="navbar-links"
              onClick={closeMobileMenu}
            >
              Rooms
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/something"
              className="navbar-links"
              onClick={closeMobileMenu}
            >
              Signup
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/login"
              className="navbar-links"
              onClick={closeMobileMenu}
            >
              Log in
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderNew;
