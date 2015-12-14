import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import UserFormView from './UserFormView';
import UserListView from './UserListView';
import BaseComponent from './BaseComponent';

import * as UserActions from '../actions/UserActions';
import * as RoleActions from '../actions/RoleActions';
import * as OrganizationActions from '../actions/OrganizationActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


@connect(state => (
{
  users: state.users,
  roles: state.roles,
  organizations: state.organizations
}
))
class UserHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  async componentDidMount(){
    const { users,roles, dispatch } = this.props;
    const userActions = bindActionCreators(UserActions, dispatch);
    const roleActions = bindActionCreators(RoleActions, dispatch);
    const organizationActions = bindActionCreators(OrganizationActions, dispatch);
    userActions.getUsers();
    roleActions.getRoles();
    organizationActions.getOrganizations();
    return;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.users.is_user_updated == true){
      this.refs.message.show();
    }
  }


  constructor(props,context) {
    super(props,context);
  }

  render() {
    const { users,roles,organizations, dispatch } = this.props;
    let userActions = bindActionCreators(UserActions, dispatch);
    let roleActions = bindActionCreators(RoleActions, dispatch);
    let organizationActions = bindActionCreators(OrganizationActions, dispatch);
    let messageView = this.getMessageView("Users updated","message");

    return (
      <div className="usersBox">
        <h3>Users</h3>
        <UserListView users={users.users} {...userActions} roles={roles.roles} organizations={organizations.organizations}/>
        <UserFormView errors={users.user_errors} onPost={userActions.postUser} roles={roles.roles} organizations={organizations.organizations} />
        {messageView}
      </div>
    );
  }

}



export default UserHandler;
