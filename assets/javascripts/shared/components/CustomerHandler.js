import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import CustomerFormView from './CustomerFormView';
import CustomerListView from './CustomerListView';
import BaseComponent from './BaseComponent';

import * as CustomerActions from '../actions/CustomerActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


@connect(state => (
{
  customers: state.customers
}
))
class CustomerHandler extends BaseComponent {


  static get contextTypes(){
  }

  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  async componentWillMount(){
    const { customers, dispatch } = this.props;
    const actions = bindActionCreators(CustomerActions, dispatch);
    actions.getCustomers();
    return;
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    const { customers, dispatch } = this.props;
    let actions = bindActionCreators(CustomerActions, dispatch);

    return (
      <div className="customersBox">
        <h1>Customers</h1>
          <CustomerListView customers={customers.customers} {...actions} />
          <CustomerFormView createCustomer={actions.createCustomer} />
      </div>
    );
  }
}



export default CustomerHandler;
