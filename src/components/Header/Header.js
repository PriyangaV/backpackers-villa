import React, { Component } from 'react';
import logo from 'assets/default-monochrome-white.svg';
import { FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { SearchInput } from 'components';
import { Dropdown } from '../../Dropdown';

class Header extends Component {
  state = {
    isOpen: false,
    dropdown: false,
    click: false
  };
  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  // const[click, setClick] = useState(false);
  // const[dropdown, setDropdown] = useState(false);

  handleClick = () =>
    this.setState({
      click: !this.state.click
    });
  closeMobileMenu = () =>
    this.setState({
      click: !this.state.click
    });

  onMouseEnter = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
    // setDropdown(!dropdown);
    // window.innerWidth < 960 ? setDropdown(false) : setDropdown(!dropdown);
  };

  onMouseLeave = () => {
    this.setState({
      dropdown: false
    });
    // window.innerWidth < 960 ? setDropdown(false) : setDropdown(false);
  };
  render() {
    const { username, isAuth, logout } = this.props;
    const { click, dropdown } = this.state;
    return (
      <nav className="navbar-n">
        <Link to="/" className="nav-bar-logo">
          <img src={logo} alt="logo" className="nav-logo" />
        </Link>
        <div className="menu-icon" onClick={this.handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? 'navbar-menu active' : 'navbar-menu'}>
          {isAuth && (
            <li>
              <div className="nav-text">
                Welcome
                <strong>
                  <em> {username}</em>
                </strong>
              </div>
            </li>
          )}
          <li className="navbar-item">
            <Link
              to="/"
              className="navbar-links"
              onClick={this.closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/rooms"
              className="navbar-links"
              onClick={this.closeMobileMenu}
            >
              Rooms
            </Link>
          </li>
          {isAuth && (
            <li className="navbar-item manage" onClick={this.onMouseEnter}>
              <a href="#0" className="navbar-links">
                Manage
                <FaCaretDown />
              </a>
              {dropdown && <Dropdown />}
            </li>
          )}
          {isAuth && (
            <div className="manage-items">
              <li className="navbar-item">
                <NavLink
                  to="/rentals/manage"
                  exact
                  className="navbar-links"
                  onClick={this.closeMobileMenu}
                >
                  Manage Rental
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/bookings/manage"
                  exact
                  className="navbar-links"
                  onClick={this.closeMobileMenu}
                >
                  Manage Booking
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/bookings/received"
                  exact
                  className="navbar-links"
                  onClick={this.closeMobileMenu}
                >
                  Received Booking
                </NavLink>
              </li>
            </div>
          )}
          {isAuth && (
            <li className="navbar-item">
              <div className="nav-link" onClick={logout}>
                logout
              </div>
            </li>
          )}
          {!isAuth && (
            <>
              {/* <li className="navbar-item">
                <Link
                  to="/register"
                  className="navbar-links"
                  onClick={this.closeMobileMenu}
                >
                  Register
                </Link>
              </li> */}
              <li className="navbar-item">
                <Link
                  to="/login"
                  className="navbar-links"
                  onClick={this.closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth: { username, isAuth } }) => {
  return {
    username,
    isAuth
  };
};

export default connect(mapStateToProps)(Header);
