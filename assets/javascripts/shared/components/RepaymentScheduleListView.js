import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import RepaymentSchedule from './RepaymentScheduleView';
import BaseComponent from './BaseComponent';
import {COLLECTION_STATUS_UNCOLLECTED} from "../constants/Constants.js"


let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import { Link } from 'react-router';

class RepaymentScheduleListView extends BaseComponent {
  render() {
    let self = this;

    let linkParams = {customer_id: self.props.customer_id};
    let extraColumn = []
    if(this.props.editable){
      extraColumn.push((
          <div key="1" className="column" data-label="Operation">Operation</div>
      ));
      extraColumn.push((
          <div key="2" className="column" data-label="Operation">Operation</div>
      ));
    }

    if(this.props.repaymentSchedules == null || !this.props.repaymentSchedules.length){

      return (

          <div className="searchClientResult">
            <div className="table">
              <div className="table-head">
                <div className="column" data-label="No.">No.</div>
                <div className="column" data-label="Schedule installment date">Schedule installment date</div>
                <div className="column" data-label="Schedule principal">Schedule principal</div>
                <div className="column" data-label="Schedule interest">Schedule interest</div>
                <div className="column" data-label="Penalty">Penalty</div>
                <div className="column" data-label="Total">Total</div>
                <div className="column" data-label="Schedule OLB">Schedule OLB</div>
                <div className="column" data-label="Actual installment date">Actual installment date</div>
                <div className="column" data-label="Actual OLB">Actual OLB</div>
                <div className="column" data-label="Late days">Late days</div>
                <div className="column" data-label="Uncollected">Uncollected</div>
                {extraColumn}
              </div>

            </div>
          </div>


      );
    }

    var repaymentScheduleNodes = this.props.repaymentSchedules.map(function(repaymentSchedule, index) {

      let editable = self.props.editable;
      if(editable){
        if(repaymentSchedule.editable){
          editable = true
        }else{
          editable = false;
        }
      }


      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <RepaymentSchedule handleCollected={self.props.handleCollected} handleNotYet={self.props.handleNotYet} handleConfirm={self.props.handleConfirm} handleCancel={self.props.handleCancel} editable={editable} customer_id={self.props.customer_id} loan_contract_id={self.props.loan_contract_id} index={index+1}  errors={repaymentSchedule.errors} key={repaymentSchedule.id} repaymentSchedule={repaymentSchedule} id={repaymentSchedule.id} actions={self.props.actions}  />
      );
    });

    return (

      <div className="searchClientResult" style={{overflow:"scroll"}}>
        <div className="table">
          <div className="table-head">
            <div className="column" data-label="No.">No.</div>
            <div className="column" data-label="Schedule installment date">Schedule installment date</div>
            <div className="column" data-label="Schedule principal">Schedule principal</div>
            <div className="column" data-label="Schedule interest">Schedule interest</div>
            <div className="column" data-label="Penalty">Penalty</div>
            <div className="column" data-label="Total">Total</div>
            <div className="column" data-label="Schedule OLB">Schedule OLB</div>
            <div className="column" data-label="Actual installment date">Actual installment date</div>
            <div className="column" data-label="Actual OLB">Actual OLB</div>
            <div className="column" data-label="Late days">Late days</div>
            <div className="column" data-label="Uncollected">Uncollected</div>
          {extraColumn}
          </div>
          {repaymentScheduleNodes}
        </div>
      </div>

    );
  }


}

export default RepaymentScheduleListView;
