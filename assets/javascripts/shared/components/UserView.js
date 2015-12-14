import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';

class UserView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.state = {text_pressed: false}

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
  }

  onChangeRole(e){
    this.setState({role: e.target.value});
  }

  onChangeOrganization(e){
    this.setState({organization: e.target.value});
  }

  handleEdit(e){
    this.setState({text_pressed : true});
  }

  handleDelete(e) {
    this.props.onDelete(this.props.user.id)
  }

  handleKeyDown(e){
    if(e.which == 13){ //enter

      var userNo = React.findDOMNode(this.refs.user_no).value.trim();
      var firstName = React.findDOMNode(this.refs.first_name).value.trim();
      var lastName = React.findDOMNode(this.refs.last_name).value.trim();
      var roleId = this.state.role;
      var organizationId = this.state.organization;
      if (!firstName || !lastName || !roleId) {
        return;
      }

      let values = {
        userNo:userNo,
        firstName:firstName,
        lastName:lastName,
        roleId:roleId,
        organizationId:organizationId
      };

      this.props.onUpdate(this.props.user.id,values);
      this.setState({text_pressed : false});
    }else if(e.which == 27){ //esc
      this.setState({text_pressed : false });
    }
  }

  getStyleInputStyle(){
    if(this.state.text_pressed){
      return this.styles().display_style;
    }else{
      return this.styles().hide_style;
    }
  }

  getH2Style(){
    if(this.state.text_pressed){
      return this.styles().hide_style;
    }else{
      return this.styles().display_style;
    }
  }



  componentWillReceiveProps(nextProps,nextState){

    if(nextProps.errors){
      this.setState({text_pressed : true});
    }

    let selectedRoleId = nextProps.user.role_id;
    if(nextState.role == null && selectedRoleId == null && nextProps.roles.length != 0){
      this.setState({role: nextProps.roles[0].id});
    }else{
      this.setState({role: selectedRoleId});
    }


    let selectedOrganizatinId = nextProps.user.organization_id;
    if(nextState.organization == null && selectedOrganizatinId == null && nextProps.organizations.length != 0){
      this.setState({organization: nextProps.organizations[0].id});
    }else{
      this.setState({organization: selectedOrganizatinId});
    }

  }

  render() {

    let errorsNode = this.getErrorNodes(this.props.user.errors);

    let selectedRoleValue =  this.state.role || this.props.user.role_id;
    let selectedRoleLabel = null;
    this.props.roles.forEach(function(role) {
      if(role.id == selectedRoleValue){
        selectedRoleLabel = role.name;
      }
    });

    let roleOptions = this.props.roles.map(function(role) {
      return <option value={role.id} key={role.id}>{role.name}</option>;
    });



    let selectedOrganizationValue =  this.state.organization || this.props.user.organization_id;
    let selectedOrganizationLabel = null;
    this.props.organizations.forEach(function(organization) {
      if(organization.id == selectedOrganizationValue){
        selectedOrganizationLabel = organization.name;
      }
    });

    let organizationOptions = this.props.organizations.map(function(organization) {
      return <option value={organization.id} key={organization.id}>{organization.name}</option>;
    });

    return (
      <tr>
        <td>
          {this.props.user.id}
          {errorsNode}
        </td>
        <td>
          <p onClick={this.handleEdit} style={this.getH2Style()} ref="user_no_p">
            {this.props.user.user_no}
          </p>
          <p className="col l3　input-field" style={this.getStyleInputStyle()}>
            <input id="user_no" ref="user_no" type="text" className="validate" defaultValue={this.props.user.user_no}  onKeyDown={this.handleKeyDown}/>
          </p>
        </td>
        <td>
          <p onClick={this.handleEdit} style={this.getH2Style()} ref="first_name_p">
            {this.props.user.first_name}
          </p>
          <p className="col l3　input-field" style={this.getStyleInputStyle()}>
            <input id="first_name" ref="first_name" type="text" className="validate" defaultValue={this.props.user.first_name}  onKeyDown={this.handleKeyDown}/>
          </p>
        </td>
        <td>
          <p onClick={this.handleEdit} style={this.getH2Style()} ref="last_name_p">
            {this.props.user.last_name}
          </p>
          <p className="col l3　input-field" style={this.getStyleInputStyle()}>
            <input id="last_name" ref="last_name" type="text" className="validate" defaultValue={this.props.user.last_name}  onKeyDown={this.handleKeyDown}/>
          </p>
        </td>

        <td>
          <p onClick={this.handleEdit} style={this.getH2Style()} ref="role_p">
            {selectedRoleLabel}
          </p>
          <p className="col l3　input-field" style={this.getStyleInputStyle()}>
            <select onChange={this.onChangeRole} className="browser-default" value={selectedRoleValue} >
              {roleOptions}
            </select>
          </p>
        </td>

        <td>
          <p onClick={this.handleEdit} style={this.getH2Style()} ref="role_p">
            {selectedOrganizationLabel}
          </p>
          <p className="col l3　input-field" style={this.getStyleInputStyle()}>
            <select onChange={this.onChangeOrganization} className="browser-default" value={selectedOrganizationValue} >
              {organizationOptions}
            </select>
          </p>
        </td>

        <td>
          <button onClick={this.handleDelete} className="btn waves-effect waves-light red darken-4" type="submit" name="action">Delete
              <i className="mdi-action-delete right"></i>
          </button>
          </td>
      </tr>

    );
  }


}


export default UserView;
