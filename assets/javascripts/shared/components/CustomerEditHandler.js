import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import CustomerFormView from './CustomerFormView';
import CustomerListView from './CustomerListView';
import BaseComponent from './BaseComponent';

import * as CustomerActions from '../actions/CustomerActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';


@connect(state => (
{
  customers: state.customers
}
))
@ReactMixin.decorate(History)
class CustomerEditHandler extends BaseComponent {


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
    actions.getCustomerDetail(this.props.params.id);
    return;
  }

  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.customers.isCustomerUpdated == true){
      this.props.history.pushState(null, `/customers/${nextProps.customers.customer.id}/borrowing_situations/edit`, {defaultFlow: true, potential: false});
    }
  }

  constructor(props,context) {
    super(props,context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){
    const { customers, dispatch } = this.props;
    const customerActions = bindActionCreators(CustomerActions, dispatch);
    customerActions.updateCustomer(this.props.params.id,values);
  }

  render() {
    const { customers, dispatch } = this.props;
    let customer = customers.customer;
    let actions = bindActionCreators(CustomerActions, dispatch);

    return (
      <div className="customersBox">
        <h1>Customer</h1>
          <CustomerFormView handleSubmit={this.handleSubmit} customer={customer} createCustomer={actions.createCustomer} />
      </div>
    );
  }
}



export default CustomerEditHandler;
