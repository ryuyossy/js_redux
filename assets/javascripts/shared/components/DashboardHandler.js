import React from 'react';
import {Link} from 'react-router';
import BaseComponent from './BaseComponent';
import AlertHandler from './AlertHandler';
import TaskHandler from './TaskHandler';
import NewsHandler from './NewsHandler';


class DashboardHandler extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard">
        <div className="panel-heading">
          <div><i className="material-icons">dashboard</i></div>
          <div><strong>Top</strong></div>
        </div>
        <div className="dashDispBox">
          <AlertHandler />
          <TaskHandler />
        </div>
        <div className="newsBox">
          <NewsHandler />
        </div>
      </div>
    );
  }

}


export default DashboardHandler;
