import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import LoanUsageListView from './LoanUsageListView';
import BaseComponent from './BaseComponent';

import * as LoanUsageActions from '../actions/LoanUsageActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class LoanUsageHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.loanUsages.isLoanUsageUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("ID Papers updated!","message");
    let loanUsages =  this.props.loanUsages;

    return (
      <div className="">
        <h6>Loan usages</h6>
        <LoanUsageListView loanUsages={loanUsages.loanUsages} actions={this.props.actions} loanUsageErrors={loanUsages.loanUsageErrors} />
        {messageView}
      </div>
    );
  }
}



export default LoanUsageHandler;
