import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';
import {formatDate} from '../utils/utils'


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let Checkbox = mui.Checkbox;

class OrganizationView extends BaseComponent {



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
    this.state = { branchManagerUserId: null };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOnCheck = this.handleOnCheck.bind(this);
    this.onChangeBranchManager = this.onChangeBranchManager.bind(this);
  }


  handleEdit(e){
    this.setState({text_pressed : true});
  }


  handleDelete(e) {
    this.props.deleteOrganization(this.props.organization.id)
  }

  handleOnCheck(e,checked){
    this.setState({is_hq : checked});
  }



  handleKeyDown(e){
    let key = e.which | e.keyCode;
    if(key == 13){ //enter
      var name = React.findDOMNode(this.refs.name).value.trim();
      var code = React.findDOMNode(this.refs.code).value.trim();
      var address = React.findDOMNode(this.refs.address).value.trim();
      var branchManagerUserId = this.state.branchManagerUserId || this.props.organization.branch_manager_user_id ;
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

      this.props.updateOrganization(this.props.organization.id,values);

      this.setState({text_pressed : false});
    }else if(key == 27){ //esc
      this.setState({text_pressed : false });
    }
  }

  onChangeBranchManager(e){
    this.setState({branchManagerUserId: e.target.value});
  }
  componentWillMount(){
    this.setState({is_hq : this.props.organization.is_hq});
  }


  componentWillReceiveProps(nextProps,nextState){
  }

  render() {
    let result;
    let errorsNode = this.getErrorNodes(this.props.errors);
    let border = "row 5 grey lighten-4"
    if(this.props.index % 2 == 0){
      border = "row"
    }
    let selectedValue =  this.state.branchManagerUserId || this.props.organization.branch_manager_user_id;

    let selectedLabel = null;
    this.props.users.forEach(function(user) {
      if(user.payload == selectedValue){
        selectedLabel = user.text;
      }
    });

    let options = this.props.users.map(function(user) {
      return <option value={user.payload} key={user.payload}>{user.text}</option>;
    });

    let isHqLabel = "No";
    if(this.props.organization.is_hq){
      isHqLabel = "Yes";
    }



    if(this.state.text_pressed || this.props.errors){
      result = (
        <div className={border}>
          <div className="col s2">
            <input id="name" ref="name" type="text" className="validate" defaultValue={this.props.organization.name}  onKeyDown={this.handleKeyDown}/>
          </div>

          <div className="col s2">
            <input id="code" ref="code" type="text" className="validate" defaultValue={this.props.organization.code}  onKeyDown={this.handleKeyDown}/>
          </div>
          <div className="col s2">
            <input id="address" ref="address" type="text" className="validate" defaultValue={this.props.organization.address}  onKeyDown={this.handleKeyDown}/>
          </div>
          <div className="input-field col s2">
            <select onChange={this.onChangeBranchManager} className="browser-default" defaultValue={selectedValue} >
              {options}
            </select>
          </div>
          <div className="col s2">
            <input id="description" ref="description" type="text" className="validate" defaultValue={this.props.organization.description}  onKeyDown={this.handleKeyDown}/>
              {errorsNode}
          </div>
          <div className="col s2">
            <Checkbox
              onCheck={this.handleOnCheck}
              ref="is_hq"
              name="is_hq"
              value="true"
              label="is HQ?"
              defaultChecked={this.state.is_hq}
              />
          </div>

          <div className="col s2">
            Delete
          </div>
      </div>
      );
    }
    else{
      result = (<div className={border}>
        <div className="col s2" onClick={this.handleEdit}>
          {this.props.organization.name}
        </div>
        <div className="col s2" onClick={this.handleEdit}>
          {this.props.organization.code}
        </div>
        <div className="col s2" onClick={this.handleEdit}>
          {this.props.organization.address}
        </div>
        <div className="col s2" onClick={this.handleEdit}>
          {selectedLabel}
        </div>
        <div className="col s2" onClick={this.handleEdit}>
          {this.props.organization.description}
        </div>
        <div className="col s2" onClick={this.handleEdit}>
          {isHqLabel}
        </div>

        <div className="col s2" onClick={this.handleDelete}>Delete</div>
      </div>);
    }

    return result
  }


}


export default OrganizationView;
