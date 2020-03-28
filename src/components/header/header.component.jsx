import React from 'react';
import {Link} from 'react-router-dom';
import './header.styles.scss';

const Header = () => (
  <div className="header">
    <Link className="logo-container" to="/">
    <div className="icon">ICON</div>
    </Link>
    <div className="options">
      <Link className="option" to="/shop">SHOP</Link>
      <Link className="option" to="/shop">CONTACT</Link>
      <Link className="option" to="/signin">SIGN IN</Link>
    </div>
  </div>
)

export default Header;