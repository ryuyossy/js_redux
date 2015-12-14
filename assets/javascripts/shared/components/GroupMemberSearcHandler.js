import React from 'react';
import { State, History } from 'react-router';
import BaseComponent from './BaseComponent';
import CustomerListView from './CustomerListView';
import PreloaderView from './PreloaderView';

import { bindActionCreators } from 'redux';
import * as CustomerActions from '../actions/CustomerActions';
import * as GroupActions from '../actions/GroupActions';
import ReactMixin from 'react-mixin';
import { connect } from 'react-redux';


@connect(state => (
{
  customers: state.customers
}
))
@ReactMixin.decorate(History)
class GroupMemberSearchHandler extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
    this.handleSearch = this.handleSearch.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleAddToGroup = this.handleAddToGroup.bind(this);
  }

  componentWillMount(){
    const { customers, dispatch } = this.props;
    const customerActions = bindActionCreators(CustomerActions, dispatch);
    if(this.props.query){
      customerActions.searchCustomers(this.props.query);
    }
 }


 handleSearch(e) {
   e.preventDefault();
   this.submitForm();
 }

 onChangeValue(e){
   let obj = {};
   obj[e.target.id] = e.target.value;
   this.setState(obj);
 }

 handleAddToGroup(customerId){
   const groupActions = bindActionCreators(GroupActions, this.props.dispatch);
   let values = {customerId: customerId}
   groupActions.addMemberToGroup(this.props.group_id,values);
 }


 submitForm(){
   var firstName = this.state.first_name;
   var lastName = this.state.last_name;
   var clientNo = this.state.client_no;
   var phoneNumber = this.state.phone_number;
   var preloads = React.findDOMNode(this.refs.preloads);

   let values = {
     firstName:firstName,
     lastName:lastName,
     phoneNumber:phoneNumber,
     clientNo:clientNo
   };

   if (!firstName && !lastName && !phoneNumber && !clientNo) {
     return;
   }

   const { customers, dispatch } = this.props;
   const customerActions = bindActionCreators(CustomerActions, dispatch);
   customerActions.searchCustomers(values);

 }




  render() {
    return (
      <div className="contentPanel">
        <div className="panel-heading">
          <div><i className="material-icons">search</i></div>
          <div><strong>Client Search</strong></div>
        </div>

        <div className="row">
          <div className="col s2">
              <input type="text" placeholder="Client No" ref="client_no" id="client_no" onChange={this.onChangeValue}/>
          </div>
          <div className="col s2">
              <input type="text" placeholder="Phone Number" ref="phone_number" id="phone_number" onChange={this.onChangeValue}/>
          </div>
          <div className="col s2">
              <input type="text" placeholder="First Name" ref="first_name" id="first_name" onChange={this.onChangeValue}/>
          </div>
          <div className="col s2">
              <input type="text" placeholder="Last Name" ref="last_name" id="last_name" onChange={this.onChangeValue}/>
          </div>
        </div>
        <div className="row">
          <div className="sbBtn floatLoaderBox">
            <div>
              <button className="btn waves-effect waves-light margin-top-20" type="submit" name="action" onClick={this.handleSearch}>Search</button>
            </div>
            <div className="dspN" ref="preloads">
              <PreloaderView />
            </div>
          </div>
        </div>

        <CustomerListView handleAddToGroup={this.handleAddToGroup} search_for_group={true} customers={this.props.customers.customers} />
      </div>
    );
  }
}

export default GroupMemberSearchHandler;
