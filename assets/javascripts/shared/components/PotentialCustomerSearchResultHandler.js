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
class PotentialCustomerSearchResultHandler extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
  }





  componentWillMount(){
    const { customers, dispatch } = this.props;
    const customerActions = bindActionCreators(CustomerActions, dispatch);
    customerActions.searchPotentialCustomers(this.props.location.query);
 }



  render() {
    return (
      <div className="contentPanel">
        <div className="panel-heading">
          <div><i className="material-icons">search</i></div>
          <div><strong>Potential client search result</strong></div>
        </div>
      <CustomerListView customers={this.props.customers.potentialCustomers} />
      </div>
    );
  }
}

export default PotentialCustomerSearchResultHandler;
