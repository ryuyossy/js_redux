import React from 'react';
import { State,History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import LoanContractHandler from './LoanContractHandler';

import * as CustomerActions from '../actions/CustomerActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';
import {formatDate} from '../utils/utils'

import {CURRENCY_MAP_FOR_LABEL,LOAN_PURPOSE_MAP_FOR_LABEL, YES_OR_NO_MAP_FOR_LABEL, YES} from "../constants/Constants.js"


@connect(state => (
{

}
))
@ReactMixin.decorate(History)
class BorrowingSituationView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
  }






  render() {
    let borrowingSituation = this.props.borrowing_situation;
    if(borrowingSituation == null){
      return (<span></span>)
    }
    let loanUsage = borrowingSituation.loan_usage || {}

    let maturityDate = new Date(borrowingSituation.maturity_date);
    maturityDate = formatDate(maturityDate);



    return (
        <div className="customer">

          <div className="grey lighten-5">
            <h5>Borrowing Situation #{this.props.index}</h5>
            <div className="row">
                  <div className="col s3">No</div>
                  <div className="col s5">{borrowingSituation.no}</div>
            </div>

            <div className="row">
                  <div className="col s3">MFI Name</div>
                  <div className="col s5">{`${borrowingSituation.mfi_name}`}</div>
            </div>
            <div className="row">
                  <div className="col s3">Currency</div>
                  <div className="col s5">{CURRENCY_MAP_FOR_LABEL[borrowingSituation.currency]}</div>
            </div>

            <div className="row">
                <div className="col s3">Amount</div>
                <div className="col s5">{borrowingSituation.amount}</div>
            </div>

            <div className="row">
                <div className="col s3">Current Loan balance</div>
                <div className="col s5">{borrowingSituation.current_loan_balance}</div>
            </div>

            <div className="row">
                <div className="col s3">Rate</div>
                <div className="col s5">{borrowingSituation.rate}</div>
            </div>

            <div className="row">
                <div className="col s3">Loan purpose</div>
                <div className="col s5">{LOAN_PURPOSE_MAP_FOR_LABEL[borrowingSituation.loan_purpose]}</div>
            </div>

            <div className="row">
                <div className="col s3">Loan Usage</div>
                <div className="col s5">{loanUsage.value}</div>
            </div>

            <div className="row">
                <div className="col s3">Duration</div>
                <div className="col s5">{`${borrowingSituation.duration_year} years ${borrowingSituation.duration_month} months`}</div>
            </div>


            <div className="row">
                <div className="col s3">Maturity Date</div>
                <div className="col s5">{maturityDate}</div>
            </div>


          </div>

        </div>
    );
  }

}


export default BorrowingSituationView;
