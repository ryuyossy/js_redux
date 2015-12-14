import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as LoanContractActions from '../actions/LoanContractActions';
import * as LoanProductActions from '../actions/LoanProductActions';
import * as LoanUsageActions from '../actions/LoanUsageActions';


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'
import ReactMixin from 'react-mixin';


@connect(state => (
{
  loanContracts: state.loanContracts,
  loanProducts: state.loanProducts,
  loanUsages: state.loanUsages
}
))
@ReactMixin.decorate(History)
class LoanContractFormView extends BaseComponent {


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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  setDefaultStates(nextProps,nextState){
    let loanProducts = nextProps.loanProducts || [];
    loanProducts = loanProducts.loanProducts || [];

    let loanProduct =  loanProducts[0];
    let loanProductId = null;
    let fundingLineId = null;
    let principalInstallmentType = null;
    let interestInstallmentType = null;
    if(loanProduct){
      loanProductId = loanProduct.id;
      fundingLineId = loanProduct.funding_line.id;
      principalInstallmentType = loanProduct.principal_installment_types[0].installment_type_id;
      interestInstallmentType = loanProduct.interest_installment_types[0].installment_type_id;
    }

    let loanUsage = nextProps.loanUsages.loanUsages[0];
    let loanUsageId = null;
    if(loanUsage){
      loanUsageId = loanUsage.id;
    }

    this.setState({
      loan_product_id: loanProductId,
      principal_installment_type: principalInstallmentType,
      interest_installment_type: interestInstallmentType,
      payment_place: "1",
      loan_purpose: "1",
      loan_usage_id: loanUsageId,
      funding_line_id: fundingLineId
    });
  }


  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.loanContracts.isLoanContractUpdated == true){
      let loanContract = nextProps.loanContracts.loanContract;
      this.props.history.pushState(null, `/customers/${loanContract.customer_id}/loanContracts/${loanContract.id}/guarantors`, {amount: loanContract.amount,defaultFlow: true});
    }
    this.setDefaultStates(nextProps,nextState);
  }

  componentWillMount(){
    const { loanProducts, dispatch } = this.props;
    const loanProductActions = bindActionCreators(LoanProductActions, dispatch);
    const loanUsageActions = bindActionCreators(LoanUsageActions, dispatch);
    loanUsageActions.getLoanUsages();
    loanProductActions.getLoanProducts();
    this.setDefaultStates(this.props,this.state);
 }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }



  handleClose(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}`,null)
  }


  handleSubmit(e) {
    e.preventDefault();
    this.submitForm();
  }

  submitForm(){

    var requestedLoanAmount = this.state.requested_loan_amount;
    var requestedInterestRate = this.state.requested_interest_rate;
    var requestedLoanTerm = this.state.requested_loan_term;

    var loanProductId = this.state.loan_product_id;
    var amount = this.state.amount;
    var interestRate = this.state.amount;
    var duration = this.state.duration;
    var principalInstallmentType = this.state.principal_installment_type;
    var interestInstallmentType = this.state.interest_installment_type;
    var gracePeriod = this.state.grace_period;


    let contractDate = this.refs.contract_date.getDate();
    contractDate = formatDate(contractDate);

    let disbursementDate = this.refs.disbursement_date.getDate();
    disbursementDate = formatDate(disbursementDate);

    // let principalFirstInstallmentDate = this.refs.principal_first_installment_date.getDate();
    // principalFirstInstallmentDate = formatDate(principalFirstInstallmentDate);
    //
    // let interestFirstInstallmentDate = this.refs.interest_first_installment_date.getDate();
    // interestFirstInstallmentDate = formatDate(interestFirstInstallmentDate);



    var paymentPlace = this.state.payment_place;

    var fundingLineId = this.state.funding_line_id;

    var loanPurpose = this.state.loan_purpose;
    var loanUsageId = this.state.loan_usage_id;

    let values = {
      requestedLoanAmount: requestedLoanAmount,
      requestedInterestRate: requestedInterestRate,
      requestedLoanTerm: requestedLoanTerm,
      loanProductId: loanProductId,
      amount: amount,
      interestRate: interestRate,
      duration: duration,
      principalInstallmentType: principalInstallmentType,
      interestInstallmentType: interestInstallmentType,
      // principalFirstInstallmentDate: principalFirstInstallmentDate,
      // interestFirstInstallmentDate: interestFirstInstallmentDate,
      gracePeriod: gracePeriod,
      contractDate: contractDate,
      disbursementDate: disbursementDate,
      paymentPlace: paymentPlace,
      fundingLineId: fundingLineId,
      loanPurpose: loanPurpose,
      loanUsageId: loanUsageId
    };

    if (!loanProductId ||  !duration || !principalInstallmentType || !interestInstallmentType || !contractDate || !disbursementDate  || !paymentPlace) {
      return;
    }

    const { loanContracts, dispatch } = this.props;
    const loanContractActions = bindActionCreators(LoanContractActions, dispatch);
    loanContractActions.createLoanContract(this.props.params.customer_id,values);

  }

  handleKeyDown(e){
    if(e.which == 13){ //enter

      this.submitForm();

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.loanContracts.errors);

    let loanProductOptions = this.props.loanProducts.loanProducts.map(function(loanProduct) {
      return <option value={loanProduct.id} key={loanProduct.id}>{loanProduct.name  }</option>;
    });


    let self = this;
    let selectedLoanProduct = {};
    this.props.loanProducts.loanProducts.forEach(function(loanProduct) {
      if(self.state.loan_product_id == loanProduct.id){
        selectedLoanProduct = loanProduct;
      }
    });

    let installmentTypesForMapping = this.props.loanProducts.installmentTypesForMapping;
    let principalInstallmentTypeOptions = {};

    if(selectedLoanProduct.principal_installment_types){
      principalInstallmentTypeOptions = selectedLoanProduct.principal_installment_types.map(function(installment_type) {
        return <option value={installment_type.installment_type_id} key={installment_type.installment_type_id}>{installmentTypesForMapping[installment_type.installment_type_id]}</option>;
      });
    }


    let interestInstallmentTypeOptions = {};

    if(selectedLoanProduct.interest_installment_types){
      interestInstallmentTypeOptions = selectedLoanProduct.interest_installment_types.map(function(installment_type) {
        return <option value={installment_type.installment_type_id} key={installment_type.installment_type_id}>{installmentTypesForMapping[installment_type.installment_type_id]}</option>;
      });
    }




    let amount = null;
    if(selectedLoanProduct.fixed_amount){
      amount = (
        <div className="input-field col s6">
          <input disabled="disabled" value={selectedLoanProduct.fixed_amount} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="amount"  id="amount" type="text" className="validate" />
            <label className="active" htmlFor="amount">Amount(Fixed)</label>
        </div>
      );
    }else{
      amount = (
        <div className="input-field col s6">
          <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="amount"  id="amount" type="text" className="validate" />
          <label className="" htmlFor="amount">Amount range:{selectedLoanProduct.min_amount} - {selectedLoanProduct.max_amount}</label>
        </div>
      );
    }


    let interestRate = null;
    if(selectedLoanProduct.fix_interest_rate){
      interestRate = (
        <div className="input-field col s6">
            <input disabled="disabled" value={selectedLoanProduct.fix_interest_rate} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="interest_rate"  id="interest_rate" type="text" className="validate" />
            <label className="active" htmlFor="interest_rate">Interest rate(Fixed)</label>
        </div>
      );
    }else{
      interestRate = (
        <div className="input-field col s6">
          <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="interest_rate"  id="interest_rate" type="text" className="validate" />
          <label className="" htmlFor="interest_rate">Interest rate range:{selectedLoanProduct.min_interest_rate} - {selectedLoanProduct.max_interest_rate}</label>
        </div>
      );
    }




    let paymentPlaceOptions = this.props.loanContracts.paymentPlaces.map(function(paymentPlace) {
      return <option value={paymentPlace.value} key={paymentPlace.value}>{paymentPlace.label}</option>;
    });

    let loanPurposeOptions = this.props.loanContracts.loanPurposes.map(function(loanPurpose) {
      return <option value={loanPurpose.value} key={loanPurpose.value}>{loanPurpose.label}</option>;
    });


    let loanUsageOptions = this.props.loanUsages.loanUsages.map(function(loanUsage) {
      return <option value={loanUsage.id} key={loanUsage.id}>{loanUsage.value}</option>;
    });


    let fundingLine = selectedLoanProduct.funding_line || {};

    return (


      <div>
        <button onClick={this.handleClose.bind(this)} >
          Back to Customer Detail
        </button>


        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="requested_loan_amount"  id="requested_loan_amount" type="text" className="validate" />
              <label className="active" htmlFor="requested_loan_amount">Requested Loan Amount</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="requested_interest_rate"  id="requested_interest_rate" type="text" className="validate" />
              <label className="active" htmlFor="requested_interest_rate">Requested interest Rate</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="requested_loan_term"  id="requested_loan_term" type="text" className="validate" />
              <label className="active" htmlFor="requested_loan_term">Requested Loan Term</label>
          </div>
        </div>



        <div className="row">
           <div className="input-field col s6">
             <label className="active" htmlFor="loan_product_id">Loan Product</label>
             <select className="browser-default" value={this.state.loan_product_id} onChange={this.onChangeValue} ref="loan_product_id" id="loan_product_id">
               {loanProductOptions}
             </select>
           </div>
        </div>


        <div className="row">
             {amount}
        </div>

        <div className="row">
             {interestRate}
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="duration"  id="duration" type="text" className="validate" />
              <label className="active" htmlFor="duration">Duration</label>
          </div>
        </div>

        <div className="row">
           <div className="input-field col s6">
             <label className="active" htmlFor="principal_installment_type">Principal installment type</label>
             <select className="browser-default" value={this.state.principal_installment_type} onChange={this.onChangeValue} ref="principal_installment_type" id="principal_installment_type">
               {principalInstallmentTypeOptions}
             </select>
           </div>
        </div>


        <div className="row">
           <div className="input-field col s6">
             <label className="active" htmlFor="interest_installment_type">Interest installment type</label>
             <select className="browser-default" value={this.state.interest_installment_type} onChange={this.onChangeValue} ref="interest_installment_type" id="interest_installment_type">
               {interestInstallmentTypeOptions}
             </select>
           </div>
        </div>



        <div className="row">
          <div className="input-field col s6">
              <input disabled="disabled" value={this.props.loanProducts.scheduleTypesForMapping[selectedLoanProduct.schedule_type]}  onKeyDown={this.handleKeyDown}  ref="schedule_type"  id="schedule_type" type="text" className="validate" />
              <label className="active" htmlFor="schedule_type">Schedule Type</label>
          </div>
        </div>



        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="grace_period"  id="grace_period" type="text" className="validate" />
              <label className="active" htmlFor="grace_period">Grace period(Day)</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <DatePicker
              hintText="Contract date"
              mode="landscape"
              formatDate={formatDate}
              ref="contract_date"
              />
            <label className="active" htmlFor="contract_date">Contract date</label>
          </div>
        </div>


        <div className="row">
          <div className="input-field col s6">
            <DatePicker
              hintText="Disbursement date"
              mode="landscape"
              formatDate={formatDate}
              ref="disbursement_date"
              />
            <label className="active" htmlFor="disbursement_date">Disbursement date</label>
          </div>
        </div>





        <div className="row">
           <div className="input-field col s6">
             <label className="active" htmlFor="payment_place">Payment place</label>
             <select className="browser-default" value={this.state.payment_place} onChange={this.onChangeValue} ref="payment_place" id="payment_place">
               {paymentPlaceOptions}
             </select>
           </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input disabled="disabled" value={fundingLine.funding_source_name}  onKeyDown={this.handleKeyDown}  ref="funding_line_id"  id="funding_line_id" type="text" className="validate" />
              <label className="active" htmlFor="funding_line_id">Source of fund</label>
          </div>
        </div>

        <div className="row">
           <div className="input-field col s6">
             <label className="active" htmlFor="loan_purpose">Loan purpose</label>
             <select className="browser-default" value={this.state.loan_purpose} onChange={this.onChangeValue} ref="loan_purpose" id="loan_purpose">
               {loanPurposeOptions}
             </select>
           </div>
        </div>

        <div className="row">
           <div className="input-field col s6">
             <label className="active" htmlFor="loan_usage_id">Loan usage</label>
             <select className="browser-default" value={this.state.loan_usage_id} onChange={this.onChangeValue} ref="loan_usage_id" id="loan_usage_id">
               {loanUsageOptions}
             </select>
           </div>
        </div>



        <div className="row">
          <button onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="mdi-content-send right"></i>
          </button>
        </div>

        {errorsNode}
      </div>

    );
  }

}

export default LoanContractFormView;
