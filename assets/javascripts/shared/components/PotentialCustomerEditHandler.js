import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import PotentialCustomerFormView from './PotentialCustomerFormView';
import PotentialCustomerListView from './PotentialCustomerListView';
import BaseComponent from './BaseComponent';

import * as CustomerActions from '../actions/CustomerActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


@connect(state => (
{
  potential_customers: state.customers
}
))
class PotentialCustomerEditHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  handleSubmit(values){
    const { customers, dispatch } = this.props;
    const customerActions = bindActionCreators(CustomerActions, dispatch);
    customerActions.updatePotentialCustomer(this.props.params.id,values);
  }

  async componentWillMount(){
    const { potential_customers, dispatch } = this.props;
    const actions = bindActionCreators(CustomerActions, dispatch);
    actions.getPotentialCustomerDetail(this.props.params.id);
    return;
  }


  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.potential_customers.isPotentialCustomerUpdated == true){
      this.props.history.pushState(null, `/potential_customers/${nextProps.potential_customers.potentialCustomer.id}/borrowing_situations/edit`, {defaultFlow: true, potential: true});
    }
  }


  constructor(props,context) {
    super(props,context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { potential_customers, dispatch } = this.props;
    let actions = bindActionCreators(CustomerActions, dispatch);
    let potentialCustomer = this.props.potential_customers.potentialCustomer;
    if(potentialCustomer == null){
      return(<span></span>);
    }

    return (
      <div className="customersBox">
        <PotentialCustomerFormView potential_customer={potentialCustomer} history={this.props.history} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}



export default PotentialCustomerEditHandler;
