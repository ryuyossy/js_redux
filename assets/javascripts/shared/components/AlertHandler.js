import React from 'react';
import {Link} from 'react-router';
import BaseComponent from './BaseComponent';


class AlertHandler extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.state = {};
  }

  render() {
    return (
      <div className="alert">
        <div className="icon-preview">
          <div><i className="material-icons">view_module</i></div>
          <div><span>Alerts</span></div>
        </div>
        <ul className="alertHandle">
          <li>
            <a href="">*Lendig #CTKY067について、BMからのApprovalが来てるよ！</a>
          </li>
          <li>
            <a href="">*Lending 担当貸出残高が、US1000を超えたよ！</a>
          </li>
          <li>
            <a href="">*Genneral 本店から連絡来てるよ!</a>
          </li>
          <li>
            <a href="">*Genneral 本店から連絡来てるよ!</a>
          </li>
          <li>
            <a href="">*Genneral 本店から連絡来てるよ!</a>
          </li>
          <li>
            <a href="">*Genneral 本店から連絡来てるよ!</a>
          </li>
        </ul>
      </div>
    );
  }

}


export default AlertHandler;
