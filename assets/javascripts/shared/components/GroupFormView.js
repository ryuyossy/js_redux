import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';
import GroupMemberSearcHandler from './GroupMemberSearcHandler';
import CustomerListView from './CustomerListView';


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
let RadioButton = mui.RadioButton;
let RadioButtonGroup = mui.RadioButtonGroup;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import * as GroupActions from '../actions/GroupActions';
import * as AreaSettingActions from '../actions/AreaSettingActions';
import * as IdPaperActions from '../actions/IdPaperActions';
import * as EconomicActivityActions from '../actions/EconomicActivityActions';

import {YES, NO} from "../constants/Constants.js"

import AddressHandler from './AddressHandler';
import GenderSelectView from './GenderSelectView';
import IdPaperSelectView from './IdPaperSelectView';
import WorkingForCompanySelectView from './WorkingForCompanySelectView';
import EconomicActivitySelectView from './EconomicActivitySelectView';
import WorkingYearsSelectView from './WorkingYearsSelectView';


let Tabs = mui.Tabs;
let Tab = mui.Tab;
let Checkbox = mui.Checkbox;

import {formatDate} from '../utils/utils'


import ReactMixin from 'react-mixin';


@connect(state => (
{
  groups: state.groups
}
))
@ReactMixin.decorate(History)
class GroupFormView extends BaseComponent {

  static get childContextTypes(){
    return {
      muiTheme: React.PropTypes.object.isRequired
    };
  }

  handleKeyDown(){

  }



  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  constructor(props,context) {
    super(props,context);
    this.state = {
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveFromGroup = this.handleRemoveFromGroup.bind(this);
    this.handleToDetail = this.handleToDetail.bind(this);
    this.handleToEdit = this.handleToEdit.bind(this);

  }
  handleToDetail(e){
    e.preventDefault();
    this.props.handleToDetail(this.state.id)
  }

  handleToEdit(e){
    e.preventDefault();
    this.props.handleToEdit(this.state.id)
  }

  handleRemoveFromGroup(id){
    const groupActions = bindActionCreators(GroupActions, this.props.dispatch);
    let groupId = this.state.id;
    let groupMemberId = id;
    groupActions.removeGroupMemberFromGroup(groupId,groupMemberId);
  }



  handleSubmit(e) {
    e.preventDefault();
    this.submitForm();
  }



  submitForm(){
    var groupName = this.state.group_name;

    let values = {
      groupName:groupName,
    };

    if (!groupName) {
      return;
    }

    this.props.handleSubmit(values)
  }






  componentWillMount(){
    const { dispatch } = this.props;

    this.setDefaultStates(this.props,this.state);
 }

 componentWillReceiveProps(nextProps,nextState){
   this.setDefaultStates(nextProps,nextState);
 }


 setDefaultStates(nextProps,nextState){
   let self = this;
   let group = nextProps.group;
   if(group != null){
     Object.keys(group).forEach(function (element, index) {
       if(self.state[element] == null){
         let obj = {};
         obj[element] = group[element]
         self.setState(obj);
       }
     });
   }

 }



  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }


  render() {

    let group = this.props.group || {}

    let errorsNode = this.getErrorNodes(group.errors);

    let self = this;


    let birthday = new Date();
    if(this.state.birthday && this.state.birthday != "0001-01-01T00:00:00Z"){
      birthday = new Date(this.state.birthday);
    }

    let idDate = new Date();
    if(this.state.id_date && this.state.id_date != "0001-01-01T00:00:00Z"){
      idDate = new Date(this.state.id_date);
    }

    let user = group.user || {};
    let organization = group.organization || {}
    let customer = group.customer || {}
    let members = group.group_members || []
    let leaderName = "N/A"
    if(customer.id){
      leaderName = customer.first_name + " " + customer.last_name
    }

    let buttonLabel = "Create"
    let groupDescription = (<div></div>)
    let groupNameElement = (<div></div>)
    let establishmentDate = new Date(group.establishment_date)
    let membersView = (<span></span>);
    let searchView = (<span></span>);
    let buttons = (<div></div>)
    if(group.id){
      buttonLabel = "Update"
      if(this.props.editable){
        groupNameElement = (<input value={this.state.group_name} type="text" ref="group_name" id="group_name" onChange={this.onChangeValue}/>);
      }else{
        groupNameElement = (<span>{group.group_name}</span>)
      }
      if(this.props.editable){
        buttons = (
          <div>
            <button className="btn waves-effect waves-light margin-top-20" type="submit" name="action" onClick={this.handleSubmit}>{buttonLabel}</button>
            <button className="btn waves-effect waves-light margin-top-20" type="button" name="action" onClick={this.handleToDetail}>Detail</button>
          </div>
        );
      }else{
        buttons = (
          <button className="btn waves-effect waves-light margin-top-20" type="button" name="action" onClick={this.handleToEdit}>Edit</button>
        );
      }
      groupDescription = (
          <div className="row">
            <div className="column" data-label="Group No">
                {group.group_no}
            </div>
            <div className="column" data-label="Group name">
              {groupNameElement}
            </div>
            <div className="column" data-label="Group leader">
                {leaderName}
            </div>
            <div className="column" data-label="Loan cycle">
                N&frasl;A
            </div>
            <div className="column" data-label="Date of establishment">
                {formatDate(establishmentDate)}
            </div>
            <div className="column" data-label="CO Responsible">
              {`${user.first_name} ${user.last_name}`}
            </div>
            <div className="column" data-label="Branch">
              {organization.name}
            </div>
          </div>
      )

      let customers = members.map(function(v){
        if(v.customer){
          return {...v.customer, group_member_id:v.id};
        }
      })

      membersView = (
        <div className="searchClientResult">
          <h5>Group members</h5>
          <CustomerListView editable={this.props.editable} handleRemoveFromGroup={this.handleRemoveFromGroup} for_group_member={true} customers={customers} />
        </div>
      );

      if(this.props.editable){
        searchView = (<GroupMemberSearcHandler group_id={group.id} />)
      }

    }else{
      buttons = (
        <button className="btn waves-effect waves-light margin-top-20" type="submit" name="action" onClick={this.handleSubmit}>{buttonLabel}</button>
      );
      groupDescription = (
        <div className="row">
          <div className="column" data-label="Group No">
              N&frasl;A
          </div>
          <div className="column" data-label="Group name">
            <input value={this.state.group_name} type="text" ref="group_name" id="group_name" onChange={this.onChangeValue}/>
          </div>
          <div className="column" data-label="Group leader">
            N&frasl;A
          </div>
          <div className="column" data-label="Loan cycle">
            N&frasl;A
          </div>
          <div className="column" data-label="Date of establishment">
            N&frasl;A
          </div>
          <div className="column" data-label="CO Responsible">
            N&frasl;A
          </div>
          <div className="column" data-label="Branch">
            N&frasl;A
          </div>
        </div>

      );


    }





    return (
      <section className="cutmerFormView">


        <div className="searchClientResult">
          <div className="table">
            <div className="table-head">
              <div className="column" data-label="Group No">Group No</div>
              <div className="column" data-label="Group name">Group name</div>
              <div className="column" data-label="Group leader">Group leader</div>
              <div className="column" data-label="Loan cycle">Loan cycle</div>
              <div className="column" data-label="Date of establishment">Date of establishment</div>
              <div className="column" data-label="CO Responsible">CO Responsible</div>
              <div className="column" data-label="Branch">Branch</div>
            </div>

            {groupDescription}

          </div>
          {buttons}

        </div>

        {membersView}

        {searchView}



      </section>

    );
  }
}

export default GroupFormView;
