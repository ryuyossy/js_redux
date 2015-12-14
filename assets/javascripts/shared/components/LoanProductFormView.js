import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let Checkbox = mui.Checkbox;


class LoanProductFormView extends BaseComponent {


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
    this.onChangeText = this.onChangeText.bind(this);
    this.handleOnCheck = this.handleOnCheck.bind(this);
  }

  handleOnCheck(e,checked){
    let obj = {};
    obj[e.target.id] = checked;
    this.setState(obj);
  }

  componentWillReceiveProps(nextProps){
    this.setDefaultFundingLine(nextProps);
  }


  setDefaultFundingLine(props){
    let fundingLine = props.fundingLines[0];
    let fundingLineId = null;
    if(fundingLine){
      fundingLineId = fundingLine.id;
    }
    this.setState({
      funding_line_id: fundingLineId
    });

  }

  componentWillMount(){
    this.setState({
      client_type1: true,
      client_type2: true,
      principal_installment_type1: true,
      principal_installment_type2: true,
      principal_installment_type3: true,
      principal_installment_type4: true,
      principal_installment_type5: true,
      principal_installment_type6: true,
      interest_installment_type1: true,
      interest_installment_type2: true,
      interest_installment_type3: true,
      interest_installment_type4: true,
      interest_installment_type5: true,
      interest_installment_type6: true,
      schedule_type: "1",
      interest_scheme: "1",
    });
    this.setDefaultFundingLine(this.props);
 }

  onChangeText(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }



  handleKeyDown(e){
    if(e.which == 13){ //enter

      var name = this.state.name;
      var clientType1 = this.state.client_type1;
      var clientType2 = this.state.client_type2;
      var fundingLineId = this.state.funding_line_id;
      var principalInstallmentType1 = this.state.principal_installment_type1;
      var principalInstallmentType2 = this.state.principal_installment_type2;
      var principalInstallmentType3 = this.state.principal_installment_type3;
      var principalInstallmentType4 = this.state.principal_installment_type4;
      var principalInstallmentType5 = this.state.principal_installment_type5;
      var principalInstallmentType6 = this.state.principal_installment_type6;

      var interestInstallmentType1 = this.state.interest_installment_type1;
      var interestInstallmentType2 = this.state.interest_installment_type2;
      var interestInstallmentType3 = this.state.interest_installment_type3;
      var interestInstallmentType4 = this.state.interest_installment_type4;
      var interestInstallmentType5 = this.state.interest_installment_type5;
      var interestInstallmentType6 = this.state.interest_installment_type6;

      var scheduleType = this.state.schedule_type;
      var interestScheme = this.state.interest_scheme;
      var minAmount = this.state.min_amount;
      var maxAmount = this.state.max_amount;
      var fixedAmount = this.state.fixed_amount;
      var minInterestRate = this.state.min_interest_rate;
      var maxInterestRate = this.state.max_interest_rate;
      var fixInterestRate = this.state.fix_interest_rate;

      var minPenaltyInterestRate = this.state.min_penalty_interest_rate;
      var maxPenaltyInterestRate = this.state.max_penalty_interest_rate;
      var fixPenaltyInterestRate = this.state.fix_penalty_interest_rate;

      var minRateOfCollateral = this.state.min_rate_of_collateral;
      var minRateOfGuarantor = this.state.min_rate_of_guarantor;
      var minRateOfCollateralPlusGuarantor = this.state.min_rate_of_collateral_plus_guarantor;


      if (!name  || !fundingLineId  || !scheduleType || !interestScheme ) {
        return;
      }
      let values = {
        name: name,
        clientType1: clientType1,
        clientType2: clientType2,
        fundingLineId: fundingLineId,
        principalInstallmentType1: principalInstallmentType1,
        principalInstallmentType2: principalInstallmentType2,
        principalInstallmentType3: principalInstallmentType3,
        principalInstallmentType4: principalInstallmentType4,
        principalInstallmentType5: principalInstallmentType5,
        principalInstallmentType6: principalInstallmentType6,

        interestInstallmentType1: interestInstallmentType1,
        interestInstallmentType2: interestInstallmentType2,
        interestInstallmentType3: interestInstallmentType3,
        interestInstallmentType4: interestInstallmentType4,
        interestInstallmentType5: interestInstallmentType5,
        interestInstallmentType6: interestInstallmentType6,

        scheduleType: scheduleType,
        interestScheme: interestScheme,
        minAmount: minAmount,
        maxAmount: maxAmount,
        fixedAmount: fixedAmount,
        minInterestRate: minInterestRate,
        maxInterestRate: maxInterestRate,
        fixInterestRate: fixInterestRate,
        minPenaltyInterestRate: minPenaltyInterestRate,
        maxPenaltyInterestRate: maxPenaltyInterestRate,
        fixPenaltyInterestRate: fixPenaltyInterestRate,
        minRateOfCollateral: minRateOfCollateral,
        minRateOfGuarantor: minRateOfGuarantor,
        minRateOfCollateralPlusGuarantor: minRateOfCollateralPlusGuarantor
      };

      this.props.actions.createLoanProduct(values);

      React.findDOMNode(this.refs.name).value = '';

    }else if(e.which == 27){ //esc

    }
  }

  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);
    let self = this;
    let clientTypeOptions = this.props.loanProductsStore.clientTypes.map(function(clientType,index) {
      let checked = false;
      if(self.state[`client_type`+clientType.value]){
        checked = true;
      }
      return   (
      <li key={index}>
      <Checkbox
          onCheck={self.handleOnCheck}
          ref={`client_type`+clientType.value}
          name={`client_type`+clientType.value}
          value={clientType.value}
          label={clientType.label}
          defaultChecked={checked}
          id={`client_type`+clientType.value}
          />
      </li>
      );
    });

    let fundingLineOptions = this.props.fundingLines.map(function(fundingLine) {
      return <option value={fundingLine.id} key={fundingLine.id}>{fundingLine.funding_source_name}</option>;
    });

    let installmentTypeOptionsForPrincipal = this.props.loanProductsStore.installmentTypes.map(function(installmentType,index) {
      let checked = false;
      if(self.state[`principal_installment_type`+installmentType.value]){
        checked = true;
      }
      return   (
      <li key={index}>
      <Checkbox
          onCheck={self.handleOnCheck}
          ref={`principal_installment_type`+installmentType.value}
          name={`principal_installment_type`+installmentType.value}
          value={installmentType.value}
          label={installmentType.label}
          defaultChecked={checked}
          id={`principal_installment_type`+installmentType.value}
          />
      </li>
      );
    });


    let installmentTypeOptionsForInterest = this.props.loanProductsStore.installmentTypes.map(function(installmentType,index) {
      let checked = false;
      if(self.state[`interest_installment_type`+installmentType.value]){
        checked = true;
      }
      return   (
      <li key={index}>
      <Checkbox
          onCheck={self.handleOnCheck}
          ref={`interest_installment_type`+installmentType.value}
          name={`interest_installment_type`+installmentType.value}
          value={installmentType.value}
          label={installmentType.label}
          defaultChecked={checked}
          id={`interest_installment_type`+installmentType.value}
          />
      </li>
      );
    });


    let scheduleTypeOptions = this.props.loanProductsStore.scheduleTypes.map(function(scheduleType,index) {
      return <option value={scheduleType.value} key={index}>{scheduleType.label}</option>;
    });

    let interestSchemeOptions = this.props.loanProductsStore.interestSchemes.map(function(interestScheme,index) {
      return <option value={interestScheme.value} key={index}>{interestScheme.label}</option>;
    });

    return (

      <div>
        <div className="row sectBox">
          <div><b>Name</b></div>
           <div className="input-field namesForm">
             <input onChange={this.onChangeText} onKeyDown={this.handleKeyDown}  ref="name"  id="name" type="text" className="validate" />
             <label className="" htmlFor="name">Name</label>
           </div>
        </div>

        <div className="row sectBox">
           <div className="input-field col s6">
             <label className="active" htmlFor="client_type">Client Type</label>
             <ul>
              {clientTypeOptions}
            </ul>
           </div>
        </div>

        <div className="row sectBox">
           <div className="input-field col s6">
             <label className="active" htmlFor="funding_line_id">Funding Line</label>
             <select className="browser-default" value={this.state.funding_line_id} onChange={this.onChangeText} ref="funding_line_id" id="funding_line_id">
               {fundingLineOptions}
             </select>
           </div>
        </div>

        <div className="row sectBox">
           <div className="input-field col s6">
             <label className="active" htmlFor="principal_installment_type">Installment type for principal</label>
               <ul>
                {installmentTypeOptionsForPrincipal}
              </ul>
           </div>
        </div>

        <div className="row sectBox">
           <div className="input-field col s6">
             <label className="active" htmlFor="interest_installment_type">Installment type for interest</label>
               <ul>
                {installmentTypeOptionsForInterest}
              </ul>
           </div>
        </div>

        <div className="row sectBox">
           <div className="input-field col s6">
             <label className="active" htmlFor="schedule_type">Schedule type</label>
             <select className="browser-default" value={this.state.schedule_type} onChange={this.onChangeText} ref="schedule_type" id="schedule_type">
               {scheduleTypeOptions}
             </select>
           </div>
        </div>

        <div className="row sectBox">
           <div className="input-field col s6">
             <label className="active" htmlFor="interest_scheme">Interest scheme</label>
             <select className="browser-default" value={this.state.interest_scheme} onChange={this.onChangeText} ref="interest_scheme" id="interest_scheme">
               {interestSchemeOptions}
             </select>
           </div>
        </div>

        <div className="row amountLayout">
          <div className="panel-heading">
            <div><i className="material-icons">settings</i></div>
            <div><strong>Amount</strong></div>
          </div>

          <div className="fieldInput">
            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="min_amount"  id="min_amount" type="text" className="validate" />
              <label className="" htmlFor="min_amount">Min</label>
            </div>

            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="max_amount"  id="max_amount" type="text" className="validate" />
              <label className="" htmlFor="max_amount">Max</label>
            </div>

            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="fixed_amount"  id="fixed_amount" type="text" className="validate" />
              <label className="" htmlFor="fixed_amount">Fix</label>
            </div>
          </div>
        </div>

        <div className="row amountLayout">
          <div className="panel-heading">
            <div><i className="material-icons">settings</i></div>
            <div><strong>Interest</strong></div>
          </div>

          <div className="fieldInput">
            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="min_interest_rate"  id="min_interest_rate" type="text" className="validate" />
              <label className="" htmlFor="min_interest_rate">Min(%)</label>
            </div>

            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="max_interest_rate"  id="max_interest_rate" type="text" className="validate" />
              <label className="" htmlFor="max_interest_rate">Max(%)</label>
            </div>

            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="fix_interest_rate"  id="fix_interest_rate" type="text" className="validate" />
              <label className="" htmlFor="fix_interest_rate">Fix(%)</label>
            </div>
          </div>
        </div>

        <div className="row amountLayout">
          <div className="panel-heading">
            <div><i className="material-icons">settings</i></div>
            <div><strong>Penalty</strong></div>
          </div>

          <div className="fieldInput">
            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="min_penalty_interest_rate"  id="min_penalty_interest_rate" type="text" className="validate" />
              <label className="" htmlFor="min_penalty_interest_rate">Min</label>
            </div>

            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="max_penalty_interest_rate"  id="max_penalty_interest_rate" type="text" className="validate" />
              <label className="" htmlFor="max_penalty_interest_rate">Max</label>
            </div>

            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="fix_penalty_interest_rate"  id="fix_penalty_interest_rate" type="text" className="validate" />
              <label className="" htmlFor="fix_penalty_interest_rate">Fix</label>
            </div>
          </div>
        </div>

        <div className="row amountLayout">
          <div className="panel-heading">
            <div><i className="material-icons">settings</i></div>
            <div><strong>Conservation</strong></div>
          </div>

          <div className="fieldInput">
            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText} ref="min_rate_of_collateral"  id="min_rate_of_collateral" type="text" className="validate" />
              <label className="" htmlFor="min_rate_of_collateral">Min % of collateral</label>
            </div>

            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText}  ref="min_rate_of_guarantor"  id="min_rate_of_guarantor" type="text" className="validate" />
              <label className="" htmlFor="min_rate_of_guarantor">Min % of guaranor</label>
            </div>

            <div className="input-field">
              <input onKeyDown={this.handleKeyDown} onChange={this.onChangeText} ref="min_rate_of_collateral_plus_guarantor"  id="min_rate_of_collateral_plus_guarantor" type="text" className="validate" />
              <label className="" htmlFor="min_rate_of_collateral_plus_guarantor">Min % of c+g</label>
            </div>
          </div>
        </div>

        {errorsNode}
      </div>

    );
  }

}

export default LoanProductFormView;
