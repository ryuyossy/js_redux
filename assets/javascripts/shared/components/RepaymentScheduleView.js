import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';
import {formatDate} from '../utils/utils'


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;

import {COLLECTION_STATUS_COLLECTED, COLLECTION_STATUS_UNCOLLECTED} from '../constants/Constants'

class RepaymentScheduleView extends BaseComponent {



  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }


  constructor(props,context) {
    super(props,context);
    this.state = { repaymentScheduleManagerUserId: null };
    this.handleCollected = this.handleCollected.bind(this);
    this.handleNotYet = this.handleNotYet.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }


  onChangeActualInstallmentDate(nill,date){
    let obj = {};
    obj["actual_installment_date"] = date;
    this.setState(obj);
  }


  handleCollected(e){
    let actualInstallmentDate = this.refs.actual_installment_date.getDate();
    actualInstallmentDate = formatDate(actualInstallmentDate);
    this.props.handleCollected(this.props.customer_id,this.props.loan_contract_id,this.props.id,actualInstallmentDate)
  }

  handleNotYet(e){
    this.props.handleNotYet(this.props.customer_id,this.props.loan_contract_id,this.props.id)
  }

  handleConfirm(e){
    this.props.handleConfirm(this.props.customer_id,this.props.loan_contract_id,this.props.id)
  }

  handleCancel(e){
    this.props.handleCancel(this.props.customer_id,this.props.loan_contract_id,this.props.id)
  }


  componentWillReceiveProps(nextProps){

  }

  render() {
    let result;
    let errorsNode = this.getErrorNodes(this.props.errors);
    let border = "row 5 grey lighten-4"
    if(this.props.index % 2 == 0){
      border = "row"
    }

    let repaymentSchedule =  this.props.repaymentSchedule;

    let scheduleInstallmentDate = "N/A";
    if(repaymentSchedule.schedule_installment_date){
      scheduleInstallmentDate = new Date(repaymentSchedule.schedule_installment_date);
      scheduleInstallmentDate = formatDate(scheduleInstallmentDate);
    }

    let schedulePrincipal = repaymentSchedule.schedule_principal || 0
    let scheduleInterest = repaymentSchedule.schedule_interest || 0
    let scheduleOlb = repaymentSchedule.schedule_outstanding_loan_balance || 0


    let actualInstallmentDate = "N/A";
    if(repaymentSchedule.actual_installment_date){
      actualInstallmentDate = new Date(repaymentSchedule.actual_installment_date);
      actualInstallmentDate = formatDate(actualInstallmentDate);
    }

    let actualPrincipal = repaymentSchedule.actual_principal || 0
    let actualInterest = repaymentSchedule.actual_interest || 0
    let actualOlb = repaymentSchedule.actual_outstanding_loan_balance || 0

    let lateDays = repaymentSchedule.late_days || 0;
    let penalty = repaymentSchedule.penalty || 0;
    let uncollected = repaymentSchedule.uncollected || 0;

    let actualInstallmentDateElement = actualInstallmentDate

    let extraColumns = []

    let total = schedulePrincipal + scheduleInterest + penalty

    if(this.props.editable){
      let className = "";
      if(repaymentSchedule.collection_status == COLLECTION_STATUS_COLLECTED){
        extraColumns.push(
          <div key="1" className="column" data-label="operation">
            <button onClick={this.handleConfirm} className="btn waves-effect waves-light" type="button" name="action">
                Save
            </button>
          </div>
        );
        extraColumns.push(
          <div key="2" className="column" data-label="operation">
            <button onClick={this.handleCancel} className="btn waves-effect waves-light red" type="button" name="action">
                Cancel
            </button>
          </div>
        );
      }else if(repaymentSchedule.collection_status == COLLECTION_STATUS_UNCOLLECTED){

        extraColumns.push(
          <div key="1" className="column" data-label="operation">
            <button onClick={this.handleCollected} className="btn waves-effect waves-light" type="button" name="action" style={{lineHeight:"16px", textTransform:"none"}}>
              Collected
            </button>
          </div>
        );
        extraColumns.push(
          <div key="2" className="column" data-label="operation">
            <button className="btn waves-effect waves-light red disabled" type="button" name="action" style={{lineHeight:"16px", textTransform:"none"}}>
              Not Yet
            </button>
          </div>
        );
        actualInstallmentDate = this.state.actual_installment_date || new Date();
        actualInstallmentDateElement = (
            <DatePicker
              hintText="Actual Installment date"
              mode="landscape"
              formatDate={formatDate}
              onChange={this.onChangeActualInstallmentDate.bind(this)}
              value={actualInstallmentDate}
              ref="actual_installment_date"
              />
        );

      }else{
        extraColumns.push(
          <div key="1" className="column" data-label="operation">
            <button onClick={this.handleCollected} className="btn waves-effect waves-light" type="button" name="action" style={{lineHeight:"16px", textTransform:"none"}}>
              Collected
            </button>
          </div>
        );
        extraColumns.push(
          <div key="2" className="column" data-label="operation">
            <button onClick={this.handleNotYet} className="btn waves-effect waves-light red" type="button" name="action" style={{lineHeight:"16px", textTransform:"none"}}>
              Not Yet
            </button>
          </div>
        );
        actualInstallmentDate = this.state.actual_installment_date || new Date();
        actualInstallmentDateElement = (
            <DatePicker
              hintText="Actual Installment date"
              mode="landscape"
              formatDate={formatDate}
              onChange={this.onChangeActualInstallmentDate.bind(this)}
              value={actualInstallmentDate}
              ref="actual_installment_date"
              />
        );
      }
    }



    result = (
      <div className="row">
        <div className="column" data-label="schedule_no">
            {this.props.index}
        </div>
        <div className="column" data-label="schedule_installment_date">
            {scheduleInstallmentDate}
        </div>
        <div className="column" data-label="schedule_principal">
            {schedulePrincipal}
        </div>
        <div className="column" data-label="schedule_interest">
            {scheduleInterest}
        </div>

        <div className="column" data-label="penalty">
            {penalty}
        </div>

        <div className="column" data-label="total">
            {total}
        </div>

        <div className="column" data-label="schedule_outstanding_loan_balance">
            {scheduleOlb}
        </div>

        <div className="column" data-label="actual_installment_date">
            {actualInstallmentDateElement}
        </div>

        <div className="column" data-label="actual_outstanding_loan_balance">
            {actualOlb}
        </div>

        <div className="column" data-label="late_days">
            {lateDays}
        </div>

        <div className="column" data-label="uncollected">
            {uncollected}
        </div>
        {extraColumns}

      </div>
    );

    return result
  }


}


export default RepaymentScheduleView;
