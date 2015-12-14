import React from 'react';
import {Link} from 'react-router';
import BaseComponent from './BaseComponent';

class HeaderHandler extends BaseComponent {
  constructor(props,context) {
    super(props,context);
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="appTop">
          <Link className="caT" to="/dashboard">CA-MIS</Link>
        </div>
        <div className="logoutM">
          <i className="pi material-icons">perm_identity</i>
          <Link className="logoutT" to="">Logout</Link>
        </div>
        <div className="helpM">
          <i className="hp material-icons">live_help</i>
          <Link className="helpT" to="">Help</Link>
        </div>
      </div>
    );
  }
}

export default HeaderHandler;
