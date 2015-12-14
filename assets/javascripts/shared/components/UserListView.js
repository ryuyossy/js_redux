import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import User from './UserView';
import BaseComponent from './BaseComponent';

class UserListView extends BaseComponent {
  render() {
    if(this.props.users.length == 0){
      return (<span></span>);
    }
    let self = this;
    var userNodes = this.props.users.map(function(user, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <User organizations={self.props.organizations} roles={self.props.roles} key={index} user={user} id={self.props.users.id} onDelete={self.props.deleteUser} onUpdate={self.props.updateUser}  />
      );
    });


    return (
      <div className="userList row">
        <table>
          <thead>
            <tr>
                <th data-field="id">id</th>
                <th data-field="user_no">user_no</th>
                <th data-field="first_name">first name</th>
                <th data-field="last_name">last name</th>
                <th data-field="role">role</th>
                <th data-field="organization">organization</th>
                <th data-field="delete">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userNodes}
          </tbody>
        </table>
      </div>
    );
  }



}

export default UserListView;
