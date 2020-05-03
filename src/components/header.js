import React from 'react';
import logo from '../imgs/logo.png';

import '../scss/header.scss';

function Header() {

    return (
        <div className="header">
            <img src={logo} alt="logo"/>
        </div>
  );
}

export default Header;