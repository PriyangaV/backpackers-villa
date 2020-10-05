import React from 'react';
import { FaCaretDown } from 'react-icons/fa';

const NewNavbar = () => {
  return (
    <header className="new-navbar">
      <div className="container">
        <input type="checkbox" name="check" id="check" />
        <div className="logo-container">
          <h3 className="logo">
            Brand <span>Name</span>
          </h3>
        </div>
        <div className="nav-btn">
          <div className="new-nav-links">
            <ul>
              <li className="nav-link" style={{ '--i': '0.6s' }}>
                <a href="/">Home</a>
              </li>
              <li className="nav-link" style={{ '--i': '0.85s' }}>
                <a href="/">
                  Manage
                  <FaCaretDown />
                </a>
                <div className="dropdown">
                  <ul>
                    <li className="dropdown-link">
                      <a href="/">Link 1</a>
                    </li>
                    <li className="dropdown-link">
                      <a href="/">Link 2</a>
                    </li>
                    <li className="dropdown-link">
                      <a href="/">
                        Link 3
                        <FaCaretDown />
                      </a>
                      <div className="dropdown second">
                        <ul>
                          <li className="dropdown-link">
                            <a href="/">Link 1</a>
                          </li>
                          <li className="dropdown-link">
                            <a href="/">Link 2</a>
                          </li>
                          <li className="dropdown-link">
                            <a href="/">Link 3</a>
                          </li>
                          <li className="dropdown-link">
                            <a href="/">
                              More
                              <FaCaretDown />
                            </a>
                            <div className="dropdown second">
                              <ul>
                                <li className="dropdown-link">
                                  <a href="/">Link 1</a>
                                </li>
                                <li className="dropdown-link">
                                  <a href="/">Link 2</a>
                                </li>
                                <li className="dropdown-link">
                                  <a href="/">Link 3</a>
                                </li>
                                <div className="arrow"></div>
                              </ul>
                            </div>
                          </li>

                          <div className="arrow"></div>
                        </ul>
                      </div>
                    </li>
                    <li className="dropdown-link">
                      <a href="/">Link 4</a>
                    </li>
                    <div className="arrow"></div>
                  </ul>
                </div>
              </li>
              <li className="nav-link" style={{ '--i': '1.1s' }}>
                <a href="/">
                  Services
                  <FaCaretDown />
                </a>
                <div className="dropdown">
                  <ul>
                    <li className="dropdown-link">
                      <a href="/">Link 1</a>
                    </li>
                    <li className="dropdown-link">
                      <a href="/">Link 2</a>
                    </li>
                    <li className="dropdown-link">
                      <a href="/">
                        Link 3
                        <FaCaretDown />
                      </a>
                      <div className="dropdown second">
                        <ul>
                          <li className="dropdown-link">
                            <a href="/">Link 1</a>
                          </li>
                          <li className="dropdown-link">
                            <a href="/">Link 2</a>
                          </li>
                          <li className="dropdown-link">
                            <a href="/">Link 3</a>
                          </li>
                          <li className="dropdown-link">
                            <a href="/">
                              More
                              <FaCaretDown />
                            </a>
                            <div className="dropdown second">
                              <ul>
                                <li className="dropdown-link">
                                  <a href="/">Link 1</a>
                                </li>
                                <li className="dropdown-link">
                                  <a href="/">Link 2</a>
                                </li>
                                <li className="dropdown-link">
                                  <a href="/">Link 3</a>
                                </li>
                                <div className="arrow"></div>
                              </ul>
                            </div>
                          </li>

                          <div className="arrow"></div>
                        </ul>
                      </div>
                    </li>
                    <li className="dropdown-link">
                      <a href="/">Link 4</a>
                    </li>
                    <div className="arrow"></div>
                  </ul>
                </div>
              </li>
              <li className="nav-link" style={{ '--i': '1.35s' }}>
                <a href="/">About</a>
              </li>
            </ul>
          </div>
          <div className="log-sign" style={{ '--i': '1.8s' }}>
            <a href="/" className="btn transparent">
              Log in
            </a>
            <a href="/" className="btn solid">
              Sign up
            </a>
          </div>
        </div>
        <div className="hamburger-menu-container">
          <div className="hamburger-menu">
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NewNavbar;
