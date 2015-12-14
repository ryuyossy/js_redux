import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import RepaymentListView from './RepaymentListView';
import BaseComponent from './BaseComponent';

import * as RepaymentActions from '../actions/RepaymentActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';


@connect(state => (
{
  repayments: state.repayments
}
))
@ReactMixin.decorate(History)
class RepaymentHandler extends BaseComponent {


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
    const { repayments, dispatch } = this.props;
    const repaymentActions = bindActionCreators(RepaymentActions, dispatch);
    repaymentActions.getRepayments(this.props.customer_id,this.props.loan_contract_id);
    return;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.repayments.isRepaymentUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
    this.handleCalculateRepayments = this.handleCalculateRepayments.bind(this);
  }

  handleCalculateRepayments(forceReload = false){
    const { repayments, dispatch } = this.props;
    const repaymentActions = bindActionCreators(RepaymentActions, dispatch);
    repaymentActions.createRepayments(this.props.customer_id,this.props.loan_contract_id,forceReload);
    return;
  }


  render() {
    let messageView = this.getMessageView("Repayments updated!","message");
    const { repayments,dispatch } = this.props;
    let actions = bindActionCreators(RepaymentActions, dispatch);

    return (
      <div className="contentPanel">
        <div className="panel-heading">
          <div><i className="material-icons">payment</i></div>
          <div><strong>Repayments</strong></div>
        </div>
        <div className="margin-mix3">
          <RepaymentListView handleCalculateRepayments={this.handleCalculateRepayments} customer_id={this.props.customer_id} loan_contract_id={this.props.loan_contract_id} repaymentsStore={repayments} repayments={repayments.repayments} actions={actions} repaymentErrors={repayments.repaymentErrors} />
        </div>
        <div className="margin-top-30">
          {messageView}
        </div>
      </div>
    );
  }
}



export default RepaymentHandler;
