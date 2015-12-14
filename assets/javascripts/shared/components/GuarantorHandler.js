import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import GuarantorListView from './GuarantorListView';
import BaseComponent from './BaseComponent';

import * as GuarantorActions from '../actions/GuarantorActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';


@connect(state => (
{
  guarantors: state.guarantors
}
))
@ReactMixin.decorate(History)
class GuarantorHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  handleClose(e){
    this.props.history.replaceState(null,"mf_setting",null);
  }


  componentWillMount(){
    const { guarantors, dispatch } = this.props;
    const guarantorActions = bindActionCreators(GuarantorActions, dispatch);
    guarantorActions.getGuarantors(this.props.customer_id,this.props.loan_contract_id);
    return;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.guarantors.isGuarantorUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    let messageView = this.getMessageView("Guarantors updated!","message");
    const { guarantors,dispatch } = this.props;
    let actions = bindActionCreators(GuarantorActions, dispatch);

    return (
      <div className="">

        <h5>Guarantors</h5>
        <GuarantorListView amount={this.props.amount} customer_id={this.props.customer_id} loan_contract_id={this.props.loan_contract_id} guarantorsStore={guarantors} guarantors={guarantors.guarantors} actions={actions} guarantorErrors={guarantors.guarantorErrors} />
        {messageView}
      </div>
    );
  }
}



export default GuarantorHandler;
