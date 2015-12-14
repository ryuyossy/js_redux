import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';


class UserFormView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
  }

  onChangeRole(e){
    this.setState({role: e.target.value});
  }

  onChangeOrganization(e){
    this.setState({organization: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var firstName = React.findDOMNode(this.refs.first_name).value.trim();
    var lastName = React.findDOMNode(this.refs.last_name).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();
    var roleId = this.state.role;
    var organizationId = this.state.organization;

    if (!firstName || !lastName || !password || !roleId) {
      return;
    }

    let values = {
      firstName:firstName,
      lastName:lastName,
      password:password,
      roleId:roleId,
      organizationId:organizationId
    };

    this.props.onPost(values);

    React.findDOMNode(this.refs.first_name).value = '';
    React.findDOMNode(this.refs.last_name).value = '';
    React.findDOMNode(this.refs.password).value = '';

  }



  componentWillReceiveProps(nextProps){
    if(this.state.role == null && nextProps.roles.length != 0){
      this.setState({role: nextProps.roles[0].id});
    }

    if(this.state.organization == null && nextProps.organizations.length != 0){
      this.setState({organization: nextProps.organizations[0].id});
    }

  }



  render() {
    let errorsNode = this.getErrorNodes(this.props.errors);

    let roleOptions = this.props.roles.map(function(role) {
      return <option value={role.id} key={role.id}>{role.name}</option>;
    });

    let organizationOptions = this.props.organizations.map(function(organization) {
      return <option value={organization.id} key={organization.id}>{organization.name}</option>;
    });

    return (
      <div className="row">
        {errorsNode}
        <form className="userForm col l12" onSubmit={this.handleSubmit} >
          <div className="row">
            <div className="input-field col l6">
              <input ref="first_name"  id="first_name" type="text" className="validate" />
              <label htmlFor="first_name">First Name</label>
            </div>

            <div className="input-field col l6">
              <input ref="last_name"  id="last_name" type="text" className="validate" />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col l6">
              <input ref="password"  id="password" type="password" className="validate" />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col l6">
              <select onChange={this.onChangeRole} className="browser-default" >
                {roleOptions}
              </select>
            </div>
          <div className="input-field col l6">
            <select onChange={this.onChangeOrganization} className="browser-default" >
              {organizationOptions}
            </select>
          </div>
        </div>


          <div className="row">
            <button onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="mdi-content-send right"></i>
            </button>
          </div>

        </form>
      </div>
    );
  }

}

export default UserFormView;
