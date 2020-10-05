import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import { NavLink } from 'react-router-dom';

export const Dropdown = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                to={item.path}
                exact
                className={item.cName}
                onClick={() => setClick(false)}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};
