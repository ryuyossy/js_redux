import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';

import * as LoanProductActions from '../actions/LoanProductActions';
import * as FundingLineActions from '../actions/FundingLineActions';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let Checkbox = mui.Checkbox;
import ReactMixin from 'react-mixin';


@connect(state => (
{
  loanProduct: state.loanProducts,
  fundingLines: state.fundingLines
}
))
@ReactMixin.decorate(History)
class LoanProductDetailView extends BaseComponent {


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
    this.handleClose = this.handleClose.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnCheck = this.handleOnCheck.bind(this);
  }

  handleOnCheck(e,checked){
    let obj = {};
    obj[e.target.id] = checked;
    this.setState(obj);
  }


  handleKeyDown(e){
    let key = e.which | e.keyCode;



    if(key == 13){ //enter

      var id = this.props.loanProduct.loanProduct.id;
      var name = this.state.name
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
      var interestInstallmentType6 = this.state.interest_installment_type6;      var scheduleType = this.state.schedule_type;
      var interestScheme = this.state.interest_scheme;
      var minAmount = this.state.min_amount;
      var maxAmount = this.state.max_amount;
      var fixedAmount = this.state.fixed_amount;
      var minInterestRate = this.state.min_interest_rate;
      var maxInterestRate = this.state.max_interest_rate;
      var fixInterestRate = this.state.fix_interest_rate;
      var minRateOfCollateral = this.state.min_rate_of_collateral;
      var minRateOfGuarantor = this.state.min_rate_of_guarantor;
      var minRateOfCollateralPlusGuarantor = this.state.min_rate_of_collateral_plus_guarantor;

      var minPenaltyInterestRate = this.state.min_penalty_interest_rate;
      var maxPenaltyInterestRate = this.state.max_penalty_interest_rate;
      var fixPenaltyInterestRate = this.state.fix_penalty_interest_rate;


      if (!name  || !fundingLineId || !scheduleType || !interestScheme) {
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
        minRateOfCollateral: minRateOfCollateral,
        minRateOfGuarantor: minRateOfGuarantor,
        minRateOfCollateralPlusGuarantor: minRateOfCollateralPlusGuarantor,
        minPenaltyInterestRate: minPenaltyInterestRate,
        maxPenaltyInterestRate: maxPenaltyInterestRate,
        fixPenaltyInterestRate: fixPenaltyInterestRate
      };

      const { loanProduct, dispatch } = this.props;
      const actions = bindActionCreators(LoanProductActions, dispatch);

      actions.updateLoanProduct(id,values);

    }else if(key == 27){ //esc
    }
  }


  handleClose(e){
    const { loanProduct, dispatch } = this.props;
    const actions = bindActionCreators(LoanProductActions, dispatch);
    actions.clearData();
    this.props.history.replaceState(null,"/settings/loanProducts",null)
  }


   componentWillMount(){
     let self = this;
     const { loanProduct, dispatch } = this.props;
     const actions = bindActionCreators(LoanProductActions, dispatch);
     actions.getLoanProductDetail(this.props.params.id);
     const fundingLineActions = bindActionCreators(FundingLineActions, dispatch);
     fundingLineActions.getFundingLines();
     this.updateStates(this.props);
  }

  updateStates(props){

    let loanProduct = props.loanProduct.loanProduct;
    let self = this;
    Object.keys(loanProduct).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = loanProduct[element]
        self.setState(obj);
      }
    });

    if(loanProduct.client_types != null){
      loanProduct.client_types.forEach( v => {
        let obj = {};
        obj["client_type"+v.client_type_id] = true;
        self.setState(obj);
      });
    }

    if(loanProduct.principal_installment_types != null){
      loanProduct.principal_installment_types.forEach( v => {
        let obj = {};
        obj["principal_installment_type"+v.installment_type_id] = true;
        self.setState(obj);
      });
    }

    if(loanProduct.interest_installment_types != null){
      loanProduct.interest_installment_types.forEach( v => {
        let obj = {};
        obj["interest_installment_type"+v.installment_type_id] = true;
        self.setState(obj);
      });
    }



  }

  componentWillReceiveProps(nextProps){
    this.updateStates(nextProps);

    if(nextProps.loanProduct.isLoanProductUpdated == true){
      this.refs.message.show();
    }

  }

  onChangeText(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  render() {
    let { loanProduct,fundingLines, dispatch } = this.props;
    loanProduct = loanProduct.loanProduct;
    let errorsNode = this.getErrorNodes(this.props.loanProduct.loanProductErrors);
    let messageView = this.getMessageView("LoanProducts updated!","message");
    let self = this;


    let clientTypeOptions = this.props.loanProduct.clientTypes.map(function(clientType,index) {
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

    let fundingLineOptions = fundingLines.fundingLines.map(function(fundingLine) {
      return <option value={fundingLine.id} key={fundingLine.id}>{fundingLine.funding_source_name}</option>;
    });

    let installmentTypeOptionsForPrincipal = this.props.loanProduct.installmentTypes.map(function(installmentType,index) {
      let checked = false;
      if(self.state[`principal_installment_type`+installmentType.value]){
        checked = true;
      }
      return   (
      <li key={index}>
      <Checkbox
          onCheck={self.handleOnCheck}_
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


    let installmentTypeOptionsForInterest = this.props.loanProduct.installmentTypes.map(function(installmentType,index) {
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

    let scheduleTypeOptions = this.props.loanProduct.scheduleTypes.map(function(scheduleType,index) {
      return <option value={scheduleType.value} key={index}>{scheduleType.label}</option>;
    });

    let interestSchemeOptions = this.props.loanProduct.interestSchemes.map(function(interestScheme,index) {
      return <option value={interestScheme.value} key={index}>{interestScheme.label}</option>;
    });



    return (


      <div>
        <button onClick={this.handleClose} >
          Back to Loan products
        </button>

        <div className="row">
           <div className="input-field col s6">
             <input onKeyDown={this.handleKeyDown} value={this.state.name} onChange={this.onChangeText}  ref="name"  id="name" type="text" className="validate" />
             <label className="active" htmlFor="name">Name</label>
           </div>
        </div>


        <div className="row">
           <div className="input-field col s6">
             <label className="active" htmlFor="client_type">Client Type</label>
               <ul>
                {clientTypeOptions}
              </ul>
           </div>
        </div>


        <div className="row">
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

        <div className="row">
           <div className="input-field col s6">
             <label className="active" htmlFor="schedule_type">Schedule type</label>
             <select className="browser-default" value={this.state.schedule_type} onChange={this.onChangeText} ref="schedule_type" id="schedule_type">
               {scheduleTypeOptions}
             </select>

           </div>
        </div>

        <div className="row">
           <div className="input-field col s6">
             <label className="active" htmlFor="interest_scheme">Interest scheme</label>
             <select className="browser-default" value={this.state.interest_scheme} onChange={this.onChangeText} ref="interest_scheme" id="interest_scheme">
               {interestSchemeOptions}
             </select>

           </div>
        </div>



        <h5>Amount</h5>

          <div className="row">
             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown} value={this.state.min_amount} onChange={this.onChangeText} ref="min_amount"  id="min_amount" type="text" className="validate" />
               <label className="active" htmlFor="min_amount">Min</label>
             </div>

             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown}　value={this.state.max_amount} onChange={this.onChangeText}  ref="max_amount"  id="max_amount" type="text" className="validate" />
               <label className="active" htmlFor="max_amount">Max</label>
             </div>

             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown}　value={this.state.fixed_amount} onChange={this.onChangeText}  ref="fixed_amount"  id="fixed_amount" type="text" className="validate" />
               <label className="active" htmlFor="fixed_amount">Fix</label>
             </div>

          </div>

          <h5>Interest</h5>

          <div className="row">
             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown}　value={this.state.min_interest_rate} onChange={this.onChangeText}  ref="min_interest_rate"  id="min_interest_rate" type="text" className="validate" />
               <label className="active" htmlFor="min_interest_rate">Min(%)</label>
             </div>

             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown} value={this.state.max_interest_rate} onChange={this.onChangeText}  ref="max_interest_rate"  id="max_interest_rate" type="text" className="validate" />
               <label className="active" htmlFor="max_interest_rate">Max(%)</label>
             </div>

             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown}  value={this.state.fix_interest_rate} onChange={this.onChangeText}  ref="fix_interest_rate"  id="fix_interest_rate" type="text" className="validate" />
               <label className="active" htmlFor="fix_interest_rate">Fix</label>
             </div>

          </div>


          <h5>Penalty</h5>

          <div className="row">
             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown}　value={this.state.min_penalty_interest_rate} onChange={this.onChangeText}  ref="min_penalty_interest_rate"  id="min_penalty_interest_rate" type="text" className="validate" />
               <label className="active" htmlFor="min_penalty_interest_rate">Min</label>
             </div>

             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown} value={this.state.max_penalty_interest_rate} onChange={this.onChangeText}  ref="max_penalty_interest_rate"  id="max_penalty_interest_rate" type="text" className="validate" />
               <label className="active" htmlFor="max_penalty_interest_rate">Max</label>
             </div>

             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown}  value={this.state.fix_penalty_interest_rate} onChange={this.onChangeText}  ref="fix_penalty_interest_rate"  id="fix_penalty_interest_rate" type="text" className="validate" />
               <label className="active" htmlFor="fix_penalty_interest_rate">Fix</label>
             </div>

          </div>




          <h5>Conservation</h5>

          <div className="row">
             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown} value={this.state.min_rate_of_collateral} onChange={this.onChangeText}  ref="min_rate_of_collateral"  id="min_rate_of_collateral" type="text" className="validate" />
               <label className="active" htmlFor="min_rate_of_collateral">Min % of collateral</label>
             </div>

             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown} value={this.state.min_rate_of_guarantor} onChange={this.onChangeText}  ref="min_rate_of_guarantor"  id="min_rate_of_guarantor" type="text" className="validate" />
               <label className="active" htmlFor="min_rate_of_guarantor">Min % of guaranor</label>
             </div>

             <div className="input-field col s3">
               <input onKeyDown={this.handleKeyDown} value={this.state.min_rate_of_collateral_plus_guarantor} onChange={this.onChangeText}  ref="min_rate_of_collateral_plus_guarantor"  id="min_rate_of_collateral_plus_guarantor" type="text" className="validate" />
               <label className="active" htmlFor="min_rate_of_collateral_plus_guarantor">Min % of c+g</label>
             </div>

          </div>


        {messageView}

        {errorsNode}
      </div>

    );



  }

}


export default LoanProductDetailView;
