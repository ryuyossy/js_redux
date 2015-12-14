import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import LoanContractListView from './LoanContractListView';
import BaseComponent from './BaseComponent';

import * as LoanContractActions from '../actions/LoanContractActions';
import * as FundingLineActions from '../actions/FundingLineActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';

@connect(state => (
{
  loanContracts: state.loanContracts
}
))
@ReactMixin.decorate(History)
class LoanContractHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  handleClose(e){
    this.props.history.replaceState(null,"/settings/mf",null);
  }


  componentWillMount(){
    const { loanContracts, dispatch } = this.props;
    const loanContractActions = bindActionCreators(LoanContractActions, dispatch);
    loanContractActions.getLoanContracts(this.props.customer_id);
    return;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.loanContracts.isLoanContractUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    let messageView = this.getMessageView("LoanContracts updated!","message");
    const { loanContracts,dispatch } = this.props;
    let actions = bindActionCreators(LoanContractActions, dispatch);

    return (
      <div className="">

        <h5>LoanContract</h5>
        <LoanContractListView customer_id={this.props.customer_id} loanContractsStore={loanContracts} loanContracts={loanContracts.loanContracts} actions={actions} loanContractErrors={loanContracts.loanContractErrors} />
        {messageView}
      </div>
    );
  }
}



export default LoanContractHandler;
