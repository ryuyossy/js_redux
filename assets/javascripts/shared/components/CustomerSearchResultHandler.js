import React from 'react';
import { State, History } from 'react-router';
import BaseComponent from './BaseComponent';
import CustomerListView from './CustomerListView';

import { bindActionCreators } from 'redux';
import * as CustomerActions from '../actions/CustomerActions';
import ReactMixin from 'react-mixin';
import { connect } from 'react-redux';


@connect(state => (
{
  customers: state.customers
}
))
@ReactMixin.decorate(History)
class CustomerSearchResultHandler extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
  }





  componentWillMount(){
    const { customers, dispatch } = this.props;
    const customerActions = bindActionCreators(CustomerActions, dispatch);
    customerActions.searchCustomers(this.props.location.query);
 }



  render() {
    return (
      <div className="contentPanel">
        <div className="panel-heading">
          <div><i className="material-icons">search</i></div>
          <div><strong>Client search result</strong></div>
        </div>
        <div className="bdc">
          <ol className="breadcrumb">
            <li ref="stepOne" className="current"><a href="#0">Search Individual</a></li>
            <li ref="stepTwo"><a href="#0">View Individual</a></li>
            <li ref="stepThree"><a href="#0">Edit Individual</a></li>
          </ol>
        </div>
        <CustomerListView customers={this.props.customers.customers} />
      </div>
    );
  }
}

export default CustomerSearchResultHandler;
