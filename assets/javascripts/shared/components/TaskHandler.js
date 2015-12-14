import React from 'react';
import {Link} from 'react-router';
import BaseComponent from './BaseComponent';


class TaskHandler extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.state = {};
  }

  render() {
    return (
      <div className="task">
        <div className="icon-preview">
          <div><i className="material-icons">view_module</i></div>
          <div><span>Tasks</span></div>
        </div>
        <ul className="taskHandle">
          <li>
            <a href="">*Lending #ITKY067 Complete Client profile</a>
          </li>
          <li>
            <a href="">*Lending #ITKY067 Complete Client profile</a>
          </li>
          <li>
            <a href="">*Lending #ITKY067 Complete Client profile</a>
          </li>
          <li>
            <a href="">*Lending #ITKY067 Complete Client profile</a>
          </li>
          <li>
            <a href="">*Lending #ITKY067 Complete Client profile</a>
          </li>
          <li>
            <a href="">*Lending #ITKY067 Complete Client profile</a>
          </li>
        </ul>
      </div>
    );
  }

}


export default TaskHandler;
