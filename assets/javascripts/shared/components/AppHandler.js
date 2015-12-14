import React from 'react';
import { State, History } from 'react-router';
import { RouteHandler } from 'react-router';
import HeaderHandler from './HeaderHandler';
import MenuHandler from './MenuHandler';
import BaseComponent from './BaseComponent';


class AppHandler extends BaseComponent {

  constructor(props,context) {
      super(props,context);
      this.state = {}
  }


  static get contextTypes(){

  }

  render() {
    return (
      <div className="app container">
        <div className="headerConpnt">
          <HeaderHandler />
        </div>
        <div className="dispBox">
          <div className="menuConpnt">
            <MenuHandler />
          </div>
          <div className="contentConpnt">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}


export default AppHandler;
