import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import GroupFormView from './GroupFormView';
import BaseComponent from './BaseComponent';
import RepaymentScheduleListView from './RepaymentScheduleListView';
import RepaymentScheduleHeaderView from './RepaymentScheduleHeaderView';


import * as RepaymentScheduleActions from '../actions/RepaymentScheduleActions';
import * as LoanContractActions from '../actions/LoanContractActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';


@connect(state => (
{
  repaymentSchedules: state.repaymentSchedules,
  loanContracts: state.loanContracts
}
))
@ReactMixin.decorate(History)
class GroupDetailHandler extends BaseComponent {


  static get contextTypes(){
  }

  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  async componentWillMount(){
    const { repaymentSchedules, dispatch } = this.props;
    const repaymentScheduleActions = bindActionCreators(RepaymentScheduleActions, dispatch);
    const loanContractActions = bindActionCreators(LoanContractActions, dispatch);

    loanContractActions.getLoanContractDetail(this.props.params.loan_contract_id,this.props.params.customer_id);
    repaymentScheduleActions.getRepaymentSchedules(this.props.params.customer_id, this.props.params.loan_contract_id);
    return;
  }

  componentWillReceiveProps(nextProps,nextState){
    // if(nextProps.groups.isGroupUpdated == true){
    //   this.props.history.pushState(null, `/groups/${nextProps.groups.group.id}/borrowing_situations/edit`, {defaultFlow: true, potential: false});
    // }
  }

  constructor(props,context) {
    super(props,context);
    this.handleCollected = this.handleCollected.bind(this);
    this.handleNotYet = this.handleNotYet.bind(this);
    this.handleToEdit = this.handleToEdit.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleToEdit(id){
    this.props.history.pushState(null, `/groups/${id}/edit`, null);
  }

  handleCollected(customerId, loanContractId, repaymentScheduleId,actualInstallmentDate){
    const { repaymentSchedules, dispatch } = this.props;
    const repaymentScheduleActions = bindActionCreators(RepaymentScheduleActions, dispatch);
    repaymentScheduleActions.executeCollect(customerId, loanContractId, repaymentScheduleId,actualInstallmentDate);
  }

  handleNotYet(customerId, loanContractId, repaymentScheduleId){
    const { repaymentSchedules, dispatch } = this.props;
    const repaymentScheduleActions = bindActionCreators(RepaymentScheduleActions, dispatch);
    repaymentScheduleActions.executeUncollect(customerId, loanContractId, repaymentScheduleId);
  }


  handleConfirm(customerId, loanContractId, repaymentScheduleId){
    const { repaymentSchedules, dispatch } = this.props;
    const repaymentScheduleActions = bindActionCreators(RepaymentScheduleActions, dispatch);
    repaymentScheduleActions.executeConfirm(customerId, loanContractId, repaymentScheduleId);
  }

  handleCancel(customerId, loanContractId, repaymentScheduleId){
    const { repaymentSchedules, dispatch } = this.props;
    const repaymentScheduleActions = bindActionCreators(RepaymentScheduleActions, dispatch);
    repaymentScheduleActions.executeCancel(customerId, loanContractId, repaymentScheduleId);
  }


  render() {

    let repaymentSchedules = this.props.repaymentSchedules || {}
    repaymentSchedules = repaymentSchedules.repaymentSchedules || {}

    let loanContract = this.props.loanContracts || {}
    loanContract = loanContract.loanContract || {}


    return (
      <div className="contentPanel">
        <h4>Collection</h4>
          <RepaymentScheduleHeaderView loan_contract={loanContract} />
          <RepaymentScheduleListView handleCollected={this.handleCollected} handleNotYet={this.handleNotYet}  handleConfirm={this.handleConfirm} handleCancel={this.handleCancel} editable={true} customer_id={this.props.params.customer_id} loan_contract_id={this.props.params.loan_contract_id}  repaymentSchedules={repaymentSchedules} />
      </div>

    );
  }
}



export default GroupDetailHandler;
