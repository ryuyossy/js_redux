import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let Checkbox = mui.Checkbox;

import {formatDate} from '../utils/utils'


class OrganizationFormView extends BaseComponent {

  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }


  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeBranchManager = this.onChangeBranchManager.bind(this);
    this.handleOnCheck = this.handleOnCheck.bind(this);
  }


  onChangeBranchManager(e){
    this.setState({branchManagerUserId: e.target.value});
  }

  componentWillMount(){
    this.setState({is_hq : false});
  }

  handleOnCheck(e,checked){
    this.setState({is_hq : checked});
  }

  handleKeyDown(e){
    if(e.which == 13){ //enter
      var name = React.findDOMNode(this.refs.name).value.trim();
      var code = React.findDOMNode(this.refs.code).value.trim();
      var address = React.findDOMNode(this.refs.address).value.trim();
      var branchManagerUserId = React.findDOMNode(this.refs.branch_manager).value.trim();
      var branchManagerUserId = this.state.branchManagerUserId;
      var description = React.findDOMNode(this.refs.description).value.trim();
      var isHq = this.state.is_hq;

      if (!name || !code || !address || !branchManagerUserId || !description) {
        return;
      }
      let values = {
        name: name,
        code: code,
        address: address,
        branchManagerUserId: branchManagerUserId,
        description: description,
        isHq: isHq
      }

      this.props.createOrganization(values);

      React.findDOMNode(this.refs.name).value = '';
      React.findDOMNode(this.refs.code).value = '';
      React.findDOMNode(this.refs.address).value = '';
      React.findDOMNode(this.refs.branch_manager).value = '';
      React.findDOMNode(this.refs.description).value = '';

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);

    let options = this.props.users.map(function(user) {
      return <option value={user.payload} key={user.payload}>{user.text}</option>;
    });

    return (
      <div className="pdBox row">
        <div className="orgM">
          <div><b>Name</b></div>
          <input type="text" placeholder="Name" ref="name" onKeyDown={this.handleKeyDown} />
        </div>
        <div className="orgM">
          <div><b>Code</b></div>
          <input type="text" placeholder="Code" ref="code" onKeyDown={this.handleKeyDown} />
        </div>
        <div className="orgM">
          <div><b>Address</b></div>
          <input type="text" placeholder="Address" ref="address" onKeyDown={this.handleKeyDown} />
        </div>
        <div className="orgM">
          <div className="bmM"><b>Branch Manager</b></div>
          <select onKeyDown={this.handleKeyDown} ref="branch_manager" onChange={this.onChangeBranchManager} className="browser-default" >
            {options}
          </select>
        </div>
        <div className="orgM">
          <div><b>Description</b></div>
          <input type="text" placeholder="Description" ref="description" onKeyDown={this.handleKeyDown} />
        </div>
        <div>
          <div><b>Is HQ?</b></div>
          <Checkbox
            onCheck={this.handleOnCheck}
            ref="is_hq"
            name="is_hq"
            value="true"
            label="is HQ?"
            defaultChecked={false}
            />
          {errorsNode}
        </div>
      </div>
    );
  }

}

export default OrganizationFormView;
