import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import RoleListView from './RoleListView';
import BaseComponent from './BaseComponent';

import * as RoleActions from '../actions/RoleActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class RoleHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.roles.isRoleUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("Roles updated!","message");
    let roles =  this.props.roles;

    return (
      <div className="contentPanel">
        <div className="panel-heading">
          <div><i className="material-icons">label_outline</i></div>
          <div><strong>Funding Lines</strong></div>
        </div>
        <RoleListView roles={roles.roles} actions={this.props.actions} roleErrors={roles.roleErrors} />
        {messageView}
      </div>
    );
  }
}



export default RoleHandler;
