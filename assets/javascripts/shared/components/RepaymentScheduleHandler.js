import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import RepaymentScheduleListView from './RepaymentScheduleListView';
import BaseComponent from './BaseComponent';

import RepaymentScheduleHeaderView from './RepaymentScheduleHeaderView';

import * as RepaymentScheduleActions from '../actions/RepaymentScheduleActions';
import * as FundingLineActions from '../actions/FundingLineActions';
import * as LoanContractActions from '../actions/LoanContractActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router';

@connect(state => (
{
  repaymentSchedules: state.repaymentSchedules,
  loanContracts: state.loanContracts
}
))
@ReactMixin.decorate(History)
class RepaymentScheduleHandler extends BaseComponent {


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
    const { repaymentSchedules, dispatch } = this.props;
    const repaymentScheduleActions = bindActionCreators(RepaymentScheduleActions, dispatch);
    const loanContractActions = bindActionCreators(LoanContractActions, dispatch);

    loanContractActions.getLoanContractDetail(this.props.params.loan_contract_id,this.props.params.customer_id);
    repaymentScheduleActions.getRepaymentSchedules(this.props.params.customer_id,this.props.params.loan_contract_id);
    return;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.repaymentSchedules.isRepaymentScheduleUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    let messageView = this.getMessageView("RepaymentSchedules updated!","message");
    const { repaymentSchedules,dispatch } = this.props;
    let actions = bindActionCreators(RepaymentScheduleActions, dispatch);

    let loanContract = this.props.loanContracts || {}
    loanContract = loanContract.loanContract || {}


    return (
      <div>
        <div className="contentPanel">
          <div className="panel-heading">
            <div><i className="material-icons">schedule</i></div>
            <div><strong>Repayment Schedule</strong></div>
          </div>
          <div className="margin-mix1">
            <Link to={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}`} >
              <a className="waves-effect red darken-1 btn">
                Back to loan contract
              </a>
            </Link>
          </div>
          <RepaymentScheduleHeaderView loan_contract={loanContract} />
          <RepaymentScheduleListView editable={false} customer_id={this.props.customer_id} loan_contract_id={this.props.params.loan_contract_id}  repaymentSchedules={repaymentSchedules.repaymentSchedules} actions={actions} repaymentScheduleErrors={repaymentSchedules.repaymentScheduleErrors} />
        </div>
        {messageView}
      </div>
    );
  }
}



export default RepaymentScheduleHandler;
