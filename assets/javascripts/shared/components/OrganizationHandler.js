import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import OrganizationListView from './OrganizationListView';
import BaseComponent from './BaseComponent';

import * as OrganizationActions from '../actions/OrganizationActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';




@connect(state => (
{
  organizations: state.organizations
}
))
class OrganizationHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  async componentWillMount(){
    const { organizations, dispatch } = this.props;
    const organizationActions = bindActionCreators(OrganizationActions, dispatch);
    organizationActions.getUserMaster();
    organizationActions.getOrganizations();
    return;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.organizations.is_organization_updated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    const { organizations, dispatch } = this.props;
    let actions = bindActionCreators(OrganizationActions, dispatch);
    let messageView = this.getMessageView("Organizations updated!","message");

    return (
      <div className="holdiaysBox">
        <OrganizationListView users={organizations.user_master_for_organization} organizations={organizations.organizations} {...actions} organization_errors={organizations.organization_errors} />
        {messageView}
      </div>
    );
  }
}



export default OrganizationHandler;
