import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';
import CurrencySelectView from './CurrencySelectView';
import LoanPurposeSelectView from './LoanPurposeSelectView';
import LoanUsageSelectView from './LoanUsageSelectView'


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
let RadioButton = mui.RadioButton;
let RadioButtonGroup = mui.RadioButtonGroup;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import * as BorrowingSituationActions from '../actions/BorrowingSituationActions';

import {YES, NO, LOAN_PURPOSE_BUSINESS, CURRENCY_USD} from "../constants/Constants.js"

import WorkingYearsSelectView from './WorkingYearsSelectView';


let Checkbox = mui.Checkbox;

import {formatDate} from '../utils/utils'
import ReactMixin from 'react-mixin';


@ReactMixin.decorate(History)
class BorrowingSituationFormView extends BaseComponent {

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
    this.onChangeSelectValue = this.onChangeSelectValue.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeWorkingYears = this.onChangeWorkingYears.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this)
    this.onChangeLoanPurpose = this.onChangeLoanPurpose.bind(this)
    this.onChangeLoanUsage = this.onChangeLoanUsage.bind(this)
    this.onChangeMaturityDate = this.onChangeMaturityDate.bind(this)

  }

  onChangeMaturityDate(nil, date){
    this.setState({maturity_date: date});
  }

  onChangeCurrency(currency){
    this.setState({currency: currency});
  }

  onChangeLoanPurpose(loanPurpose){
    this.setState({loan_purpose: loanPurpose});
  }

  onChangeLoanUsage(loanUsageId){
    this.setState({loan_usage_id: loanUsageId});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.submitForm();
  }



  submitForm(){
    var mfiName = this.state.mfi_name;
    var currency = this.state.currency;
    var amount = this.state.amount;
    var currentLoanBalance = this.state.current_loan_balance;
    var rate = this.state.rate;
    var loanPurpose = this.state.loan_purpose;
    var loanUsageId = this.state.loan_usage_id;
    var durationYear = this.state.duration_year;
    var durationMonth = this.state.duration_month;

    var maturityDate = this.refs.maturity_date.getDate();
    maturityDate = formatDate(maturityDate);




    let values = {
      id:this.props.id,
      mfiName:mfiName,
      currency:currency,
      amount:amount,
      currentLoanBalance:currentLoanBalance,
      rate:rate,
      loanPurpose:loanPurpose,
      loanUsageId:loanUsageId,
      durationYear:durationYear,
      durationMonth:durationMonth,
      maturityDate:maturityDate
      };

    if (!mfiName || !currency || !currentLoanBalance || !rate || !loanPurpose) {
      return;
    }


    this.props.onSubmit(values)

  }





  handleKeyDown(e){
  }

  componentWillMount(){
    this.setDefaultStates(this.props,this.state);
  }


  componentWillReceiveProps(nextProps,nextState){
    this.setDefaultStates(nextProps,nextState);
  }


   setDefaultStates(nextProps,nextState){
     if(this.state.loan_purpose == null){
       this.setState({loan_purpose: LOAN_PURPOSE_BUSINESS})
     }
     if(this.state.currency == null){
       this.setState({currency: CURRENCY_USD})
     }
     if(this.state.loan_usage_id == null && nextProps.loan_usages != null && nextProps.loan_usages.length > 0){
       this.setState({loan_usage_id: nextProps.loan_usages[0].id})
     }


     let self = this;
     let borrowingSituation = nextProps.borrowing_situation;
     if(borrowingSituation != null){
       Object.keys(borrowingSituation).forEach(function (element, index) {
         if(self.state[element] == null){
           let obj = {};
           obj[element] = borrowingSituation[element]
           self.setState(obj);
         }
       });
     }


   }



  onChangeSelectValue(e) {
    this.setState({selectValue: e.target.value});
  }

  onChangeWorkingYears(year,month){
    this.setState({working_year: year, working_month: month});
  }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }


  render() {

    // let errorsNode = this.getErrorNodes(this.props.guarantors.errors);

    let self = this;
    let maturityDate = new Date();
    if(this.state.maturity_date){
      maturityDate = new Date(this.state.maturity_date);
    }

    let buttonLabel = "Save"
    if(this.props.id){
      buttonLabel = "Update"
    }



    return (
      <div className="cutmerFormView">
        <div className="tabsOnes">
          <h5 className="titlesM">Borrowing situation</h5>


          <div className="areaWrap row">


            <div className="area">
              <div className="item1">MFI name</div>
              <div className="item2">
                <input ref="mfi_name" onChange={this.onChangeValue} value={this.state.mfi_name} placeholder="MFI name" id="mfi_name" type="text" className="validate fieldsWidth" />
              </div>
            </div>

            <div className="area">
              <div className="item1">Currency</div>
              <div className="item2">
                <CurrencySelectView onChange={this.onChangeCurrency} value={this.state.currency} ref="currency" id="currency"/>
              </div>
            </div>

            <div className="area">
              <div className="item1">Amount</div>
              <div className="item2">
                <input onChange={this.onChangeValue} value={this.state.amount} ref="amount" placeholder="amount" id="amount" type="number" className="validate fieldsWidth" />
              </div>
            </div>

            <div className="area">
              <div className="item1">Current Loan balance</div>
              <div className="item2">
                <input onChange={this.onChangeValue} value={this.state.current_loan_balance} ref="current_loan_balance" placeholder="Current loan balance" id="current_loan_balance" type="number" className="validate fieldsWidth" />
              </div>
            </div>

            <div className="area">
              <div className="item1">Rate</div>
              <div className="item2">
                <input  onChange={this.onChangeValue} value={this.state.rate} ref="rate" placeholder="rate" id="rate" type="number" className="validate" step="0.01"　/>
              </div>
            </div>

            <div className="area">
              <div className="item1">Loan purpose</div>
              <div className="item2 bn">
                <LoanPurposeSelectView onChange={this.onChangeLoanPurpose} value={this.state.loan_purpose} ref="loan_purpose" />
              </div>
            </div>

            <div className="area">
              <div className="item1">Loan usage</div>
              <div className="item2">
                <LoanUsageSelectView loan_usages={this.props.loan_usages} onChange={this.onChangeLoanUsage} value={this.state.loan_usage_id} ref="loan_usage_id" />
              </div>
            </div>

            <div className="area">
              <div className="item1">Duration(Year, Month)</div>
              <div className="item2">
                <input onChange={this.onChangeValue} value={this.state.duration_year} ref="duration_year" placeholder="year" id="duration_year" type="number" className="validate" 　/>
                <input onChange={this.onChangeValue} value={this.state.duration_month} ref="duration_month" placeholder="month" id="duration_month" type="number" className="validate" 　/>
              </div>
            </div>



            <div className="area">
              <div className="item1">Maturity Date</div>
              <div className="item2">
                <DatePicker
                  hintText="Date"
                　mode="landscape"
                  formatDate={formatDate}
                  value={maturityDate}
                  ref="maturity_date"
                  onKeyDown={this.handleKeyDown}
                  className="fieldsWidth"
                  onChange={this.onChangeMaturityDate}
                />
              </div>
            </div>
          </div>


          <div className="row">
            <button onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">{buttonLabel}
                <i className=""></i>
            </button>
          </div>


        </div>
      </div>
    );
  }
}

export default BorrowingSituationFormView;
