import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';

import * as LoanContractActions from '../actions/LoanContractActions';
import * as FundingLineActions from '../actions/FundingLineActions';

import GuarantorHandler from './GuarantorHandler'
import LoanContractCollateralHandler from './LoanContractCollateralHandler'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {formatDate} from '../utils/utils'
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';


@connect(state => (
{
  loanContract: state.loanContracts,
  loanProduct: state.loanProducts
}
))
@ReactMixin.decorate(History)
class LoanContractDetailView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }


  handleKeyDown(e){
    let key = e.which | e.keyCode;



    if(key == 13){ //enter

      var id = this.props.loanContract.loanContract.id;
      var name = this.state.name


      if (!name) {
        return;
      }
      let values = {
        name: name
      };

      const { loanContract, dispatch } = this.props;
      const actions = bindActionCreators(LoanContractActions, dispatch);

      actions.updateLoanContract(id,values);

    }else if(key == 27){ //esc
    }
  }


  handleClose(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}`,null)
  }
  handleEdit(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/edit`,null)
  }


   componentWillMount(){
     const { loanContract, dispatch } = this.props;
     const loanContractActions = bindActionCreators(LoanContractActions, dispatch);
     loanContractActions.getLoanContractDetail(this.props.params.loan_contract_id,this.props.params.customer_id);
  }

  componentWillReceiveProps(nextProps){
    let loanContract = nextProps.loanContract.loanContract;
    let self = this;
    Object.keys(loanContract).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = loanContract[element]
        self.setState(obj);
      }
    });

    if(nextProps.loanContract.isLoanContractUpdated == true){
      this.refs.message.show();
    }

  }

  onChangeText(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  render() {
    let { loanContract,loanProduct, dispatch } = this.props;
    let loanContractDetail = loanContract.loanContract;
    let errorsNode = this.getErrorNodes(this.props.loanContract.loanContractErrors);
    let messageView = this.getMessageView("LoanContracts updated!","message");
    let loanProductName = "N/A";
    let scheduleType = "N/A"
    let fundingLineName = "N/A";

    if(loanContractDetail.loan_product){
      loanProductName = loanContractDetail.loan_product.name;
      scheduleType = loanProduct.scheduleTypesForMapping[loanContractDetail.loan_product.schedule_type];

      if(loanContractDetail.loan_product.funding_line){
        fundingLineName = loanContractDetail.loan_product.funding_line.funding_source_name;
      }

    }

    let loanUsageName = "N/A";
    if(loanContractDetail.loan_usage){
      loanUsageName = loanContractDetail.loan_usage.value;
    }


    let branchName = "N/A";
    if(loanContractDetail.organization){
      branchName = loanContractDetail.organization.name;
    }

    let principalInstallmentType = loanProduct.installmentTypesForMapping[loanContractDetail.principal_installment_type];
    let interestInstallmentType = loanProduct.installmentTypesForMapping[loanContractDetail.interest_installment_type];

    let contractDate = new Date(loanContractDetail.contract_date);
    contractDate = formatDate(contractDate);

    let disbursementDate = new Date(loanContractDetail.disbursement_date);
    disbursementDate = formatDate(disbursementDate);

    let principalFirstInstallmentDate = new Date(loanContractDetail.principal_first_installment_date);
    principalFirstInstallmentDate = formatDate(principalFirstInstallmentDate);

    let interestFirstInstallmentDate = new Date(loanContractDetail.interest_first_installment_date);
    interestFirstInstallmentDate = formatDate(interestFirstInstallmentDate);


    let principalLastInstallmentDate = new Date(loanContractDetail.principal_last_installment_date);
    principalLastInstallmentDate = formatDate(principalLastInstallmentDate);

    let interestLastInstallmentDate = new Date(loanContractDetail.interest_last_installment_date);
    interestLastInstallmentDate = formatDate(interestLastInstallmentDate);

    let paymentPlace = loanContract.paymentPlacesForMapping[loanContractDetail.payment_place];
    let loanPurpose = loanContract.loanPurposesForMapping[loanContractDetail.loan_purpose];


    return (


      <div>
        <button onClick={this.handleClose} >
          Back to Customer Detail
        </button>

        <button onClick={this.handleEdit} >
          Edit
        </button>

        <h4>Loan contract</h4>


        <div className="row">
           <div className="col s10">
             <h5>Loan contract number</h5>
             <p>{loanContractDetail.loan_contract_no}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Requested Loan Amount</h5>
             <p>{loanContractDetail.requested_loan_amount}</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>Requested Interest Rate</h5>
             <p>{loanContractDetail.requested_interest_rate}%</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>Requested Loan Term</h5>
             <p>{loanContractDetail.requested_loan_term}</p>
           </div>
        </div>




        <div className="row">
           <div className="col s10">
             <h5>Loan product name</h5>
             <p>{loanProductName}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>CO Name</h5>
             <p>{loanContractDetail.co_name}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Branch</h5>
             <p>{branchName}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Amount</h5>
             <p>{loanContractDetail.amount}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Interest rate</h5>
             <p>{loanContractDetail.interest_rate}%</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Duration</h5>
             <p>{loanContractDetail.duration}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Principal installment type</h5>
             <p>{principalInstallmentType}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Interest installment type</h5>
             <p>{interestInstallmentType}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Schedule type</h5>
             <p>{scheduleType}</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>Number of installment for principal</h5>
             <p>{loanContractDetail.principal_number_of_installment}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Number of installment for interest</h5>
             <p>{loanContractDetail.interest_number_of_installment}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Grace period</h5>
             <p>{loanContractDetail.grace_period}</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>Contract date</h5>
             <p>{contractDate}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Disbursement date</h5>
             <p>{disbursementDate}</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>First installment date for principal</h5>
             <p>{principalFirstInstallmentDate}</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>First installment date for interest</h5>
             <p>{interestFirstInstallmentDate}</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>Last installment date for principal</h5>
             <p>{principalLastInstallmentDate}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Last installment date for interest</h5>
             <p>{interestLastInstallmentDate}</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>Payment place</h5>
             <p>{paymentPlace}</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>Source of fund</h5>
             <p>{fundingLineName}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Loan purpose</h5>
             <p>{loanPurpose}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Loan usage</h5>
             <p>{loanUsageName}</p>
           </div>
        </div>

        <Link to={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/repayment_schedules`} >
          Repayment schedules
        </Link>


        {messageView}

        {errorsNode}

        <h4>Guarantors</h4>

        <GuarantorHandler amount={loanContractDetail.amount} customer_id={this.props.params.customer_id} loan_contract_id={this.props.params.loan_contract_id} />

        <LoanContractCollateralHandler customer_id={this.props.params.customer_id} loan_contract_id={this.props.params.loan_contract_id} />


      </div>

    );



  }

}


export default LoanContractDetailView;
