import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Role from './RoleView';
import BaseComponent from './BaseComponent';
import RoleFormView from './RoleFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class RoleListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.roles == null || !this.props.roles.length){
      return (
        <div>
          <div className="row">
            <div className="col s2"><b>Funding Source Name</b></div>
          </div>
          <RoleFormView actions={this.props.actions}  errors={this.props.roleErrors} createRole={this.props.createRole} />
        </div>

      );
    }

    var roleNodes = this.props.roles.map(function(role, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Role index={index+1}  errors={role.errors} key={role.id} role={role} id={role.id} actions={self.props.actions}  />
      );
    });


    return (
    <div className="margin-mix3">
      <div className="row">
        <div className="col s2"><b>Funding Source Name</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {roleNodes}
      </ReactCSSTransitionGroup>
      <RoleFormView actions={this.props.actions} errors={this.props.roleErrors} createRole={this.props.createRole} />
    </div>

    );
  }


}

export default RoleListView;
