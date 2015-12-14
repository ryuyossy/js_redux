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
class LoanContractEditView extends BaseComponent {


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
    this.onChangeDisbursementDate = this.onChangeDisbursementDate.bind(this);
    this.onChangeContractDate = this.onChangeContractDate.bind(this);

  }


  setDefaultStates(nextProps,nextState){

    let loanProduct = nextProps.loanContracts.loanContract.loan_product;
    if(loanProduct){
      let fundingLineId = loanProduct.funding_line.id;
      this.setState({funding_line_id: fundingLineId})
    }

    let self = this;
    let loanContract = nextProps.loanContracts.loanContract;
    Object.keys(loanContract).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = loanContract[element]
        self.setState(obj);
      }
    });



  }


  componentWillReceiveProps(nextProps){
    if(nextProps.loanContracts.isLoanContractUpdated == true){
      this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}`,null)
    }
    this.setDefaultStates(nextProps);
  }

  componentWillMount(){
    const { loanProducts, dispatch } = this.props;
    const loanUsageActions = bindActionCreators(LoanUsageActions, dispatch);
    const loanProductActions = bindActionCreators(LoanProductActions, dispatch);
    const loanContractActions = bindActionCreators(LoanContractActions, dispatch);
    loanUsageActions.getLoanUsages();
    loanProductActions.getLoanProducts();
    loanContractActions.getLoanContractDetail(this.props.params.loan_contract_id,this.props.params.customer_id);
    this.setDefaultStates(this.props);
 }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  onChangeContractDate(nill,date){
    let obj = {};
    obj["contract_date"] = date;
    this.setState(obj);
  }

  onChangeDisbursementDate(nill,date){
    let obj = {};
    obj["disbursement_date"] = date;
    this.setState(obj);
  }

  // onChangePrincipalFirstInstallmentDate(nill,date){
  //   let obj = {};
  //   obj["principal_first_installment_date"] = date;
  //   this.setState(obj);
  // }
  //
  // onChangeInterestFirstInstallmentDate(nill,date){
  //   let obj = {};
  //   obj["interest_first_installment_date"] = date;
  //   this.setState(obj);
  // }



  handleClose(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}`,null)
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
    var interestRate = this.state.interest_rate;
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
      loanPurpose: loanPurpose,
      loanUsageId: loanUsageId
    };


    if (!loanProductId ||  !duration || !principalInstallmentType || !interestInstallmentType  || !contractDate || !disbursementDate || !paymentPlace) {
      console.log(values)
      return;
    }

    const { loanContracts, dispatch } = this.props;
    const loanContractActions = bindActionCreators(LoanContractActions, dispatch);
    loanContractActions.updateLoanContract(this.props.params.loan_contract_id, this.props.params.customer_id,values);

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
        return <option value={installment_type.installment_type_id} key={installment_type.id}>{installmentTypesForMapping[installment_type.installment_type_id]}</option>;
      });
    }


    let interestInstallmentTypeOptions = {};

    if(selectedLoanProduct.interest_installment_types){
      interestInstallmentTypeOptions = selectedLoanProduct.interest_installment_types.map(function(installment_type) {
        return <option value={installment_type.installment_type_id} key={installment_type.id}>{installmentTypesForMapping[installment_type.installment_type_id]}</option>;
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
          <input value={this.state.amount} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="amount"  id="amount" type="text" className="validate" />
          <label className="active" htmlFor="amount">Amount range:{selectedLoanProduct.min_amount} - {selectedLoanProduct.max_amount}</label>
        </div>
      );
    }


    let interestRate = null;
    if(selectedLoanProduct.fix_interest_rate){
      interestRate = (
        <div className="input-field col s6">
            <input disabled="disabled" value={selectedLoanProduct.fix_interest_rate} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="interest_rate"  id="interest_rate" type="text" className="validate" />
            <label className="active" htmlFor="interest_rate">Interest rate(Fixed) %</label>
        </div>
      );
    }else{
      interestRate = (
        <div className="input-field col s6">
          <input value={this.state.interest_rate} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="interest_rate"  id="interest_rate" type="text" className="validate" />
          <label className="active" htmlFor="interest_rate">Interest rate range:{selectedLoanProduct.min_interest_rate}% - {selectedLoanProduct.max_interest_rate}%</label>
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

    let contractDate = new Date(this.state.contract_date);
    let disbursementDate = new Date(this.state.disbursement_date);

    // let principalFirstInstallmentDate = new Date(this.state.principal_first_installment_date);
    // let interestFirstInstallmentDate = new Date(this.state.interest_first_installment_date);


    return (


      <div>
        <button onClick={this.handleClose.bind(this)} >
          Back to Loan contract detail
        </button>


        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.requested_loan_amount}  ref="requested_loan_amount"  id="requested_loan_amount" type="text" className="validate" />
              <label className="active" htmlFor="requested_loan_amount">Requested Loan Amount</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.requested_interest_rate}  ref="requested_interest_rate"  id="requested_interest_rate" type="text" className="validate" />
              <label className="active" htmlFor="requested_interest_rate">Requested interest Rate (%)</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.requested_loan_term}  ref="requested_loan_term"  id="requested_loan_term" type="text" className="validate" />
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
              <input value={this.state.duration} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="duration"  id="duration" type="text" className="validate" />
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
              <input value={this.state.grace_period} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="grace_period"  id="grace_period" type="text" className="validate" />
              <label className="active" htmlFor="grace_period">Grace period(Day)</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <DatePicker
              hintText="Contract date"
              mode="landscape"
              formatDate={formatDate}
              onChange={this.onChangeContractDate.bind(this)}
              value={contractDate}
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
              onChange={this.onChangeDisbursementDate.bind(this)}
              ref="disbursement_date"
              value={disbursementDate}
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

export default LoanContractEditView;
