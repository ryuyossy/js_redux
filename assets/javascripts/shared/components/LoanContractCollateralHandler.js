import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import LoanContractCollateralListView from './LoanContractCollateralListView';
import BaseComponent from './BaseComponent';

import * as LoanContractCollateralActions from '../actions/LoanContractCollateralActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';

@connect(state => (
{
  loanContractCollaterals: state.loanContractCollaterals
}
))
@ReactMixin.decorate(History)
class LoanContractCollateralHandler extends BaseComponent {


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
    const { loanContractCollaterals, dispatch } = this.props;
    const loanContractCollateralActions = bindActionCreators(LoanContractCollateralActions, dispatch);
    loanContractCollateralActions.getLoanContractCollaterals(this.props.customer_id,this.props.loan_contract_id);
    return;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.loanContractCollaterals.isLoanContractCollateralUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    let messageView = this.getMessageView("LoanContractCollaterals updated!","message");
    const { loanContractCollaterals,dispatch } = this.props;
    let actions = bindActionCreators(LoanContractCollateralActions, dispatch);

    return (
      <div className="">

        <h5>Collaterals</h5>
        <LoanContractCollateralListView amount={this.props.amount} customer_id={this.props.customer_id} loan_contract_id={this.props.loan_contract_id} loanContractCollateralsStore={loanContractCollaterals} loanContractCollaterals={loanContractCollaterals.loanContractCollaterals} actions={actions} loanContractCollateralErrors={loanContractCollaterals.loanContractCollateralErrors} />
        {messageView}
      </div>
    );
  }
}



export default LoanContractCollateralHandler;
