import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import ProvisioningRoleListView from './ProvisioningRoleListView';
import BaseComponent from './BaseComponent';

import * as ProvisioningRoleActions from '../actions/ProvisioningRoleActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class ProvisioningRoleHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.provisioningRoles.isProvisioningRoleUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("ProvisioningRoles updated!","message");
    let provisioningRoles =  this.props.provisioningRoles;

    return (
      <div className="provisions">
        <ProvisioningRoleListView provisioningRoles={provisioningRoles.provisioningRoles} actions={this.props.actions} provisioningRoleErrors={provisioningRoles.provisioningRoleErrors} />
        {messageView}
      </div>
    );
  }
}



export default ProvisioningRoleHandler;
