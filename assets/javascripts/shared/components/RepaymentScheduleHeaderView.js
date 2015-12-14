import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import RepaymentSchedule from './RepaymentScheduleView';
import BaseComponent from './BaseComponent';
import {GENDER_MAP_FOR_LABEL} from "../constants/Constants.js"

import {formatDate} from '../utils/utils'

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import { Link } from 'react-router';

class RepaymentScheduleHeaderView extends BaseComponent {
  render() {
    let self = this

    let linkParams = {customer_id: self.props.customer_id};
    let loanContract = this.props.loan_contract || {};
    let loanProduct = loanContract.loan_product || {}
    let customer = loanContract.customer || {};
    let user = customer.user || {};
    let organization = loanContract.organization || {}
    let disbursementDate = new Date(loanContract.disbursement_date)
    disbursementDate = formatDate(disbursementDate)
    let principalFirstInstallmentDate = new Date(loanContract.principal_first_installment_date)
    principalFirstInstallmentDate = formatDate(principalFirstInstallmentDate)

    let principalLastInstallmentDate = new Date(loanContract.principal_last_installment_date)
    principalLastInstallmentDate = formatDate(principalLastInstallmentDate)

    let interestFirstInstallmentDate = new Date(loanContract.interest_first_installment_date)
    interestFirstInstallmentDate = formatDate(interestFirstInstallmentDate)

    let interestLastInstallmentDate = new Date(loanContract.interest_last_installment_date)
    interestLastInstallmentDate = formatDate(interestLastInstallmentDate)

    if(!loanContract){
      return (
        <div></div>
      );
    }

    return (

      <div className="searchClientResult">
        <div className="table">
          <div className="table-head">
            <div className="column" data-label="Branch">Branch</div>
            <div className="column" data-label="CO Responsible">CO Responsible</div>
            <div className="column" data-label="Client Name">Client Name</div>
            <div className="column" data-label="Gender">Gender</div>
            <div className="column" data-label="Client No">Client No</div>

            <div className="column" data-label="Contract No">Contract No</div>
            <div className="column" data-label="Loan Product">Loan Product</div>
            <div className="column" data-label="Ammount">Amount</div>
          </div>

          <div className="row">
            <div className="column" data-label="Branch">
              {organization.name}
            </div>

            <div className="column" data-label="Co Responsible">
              {`${user.first_name} ${user.last_name}`}
            </div>

            <div className="column" data-label="Client Name">
              {`${customer.first_name} ${customer.last_name}`}
            </div>


            <div className="column" data-label="Gender">
              {GENDER_MAP_FOR_LABEL[customer.gender]}
            </div>

            <div className="column" data-label="Client No">
              {customer.client_no}
            </div>

            <div className="column" data-label="Contract No">
              {loanContract.loan_contract_no}
            </div>

            <div className="column" data-label="Loan Product">
              {loanProduct.name}
            </div>

            <div className="column" data-label="Amount">
              {loanContract.amount}
            </div>
          </div>

        </div>





        <div className="table">
          <div className="table-head">
            <div className="column" data-label="Interest Rate">Interest Rate</div>
            <div className="column" data-label="Grace Period">Grace Period</div>
            <div className="column" data-label="Duration">Duration</div>
            <div className="column" data-label="Disbursement Date">Disbursement Date</div>
            <div className="column" data-label="First Installment Date For Principal">First Installment Date For Principal</div>
            <div className="column" data-label="Last Installment Date For Principal">Last Installment Date For Principal</div>
            <div className="column" data-label="First Installment Date For Interest">First Installment Date For Interest</div>
            <div className="column" data-label="Last Installment Date For Interest">Last Installment Date For Interest</div>
          </div>

          <div className="row">
            <div className="column" data-label="Interest Rate">
              {loanContract.interest_rate}
            </div>

            <div className="column" data-label="Grace Period">
              {loanContract.grace_period}
            </div>

            <div className="column" data-label="Duration">
              {loanContract.duration}
            </div>

            <div className="column" data-label="Disbursement Date">
              {disbursementDate}
            </div>

            <div className="column" data-label="First Installment Date For Principal">
              {principalFirstInstallmentDate}
            </div>

            <div className="column" data-label="Last Installment Date For Principal">
              {principalLastInstallmentDate}
            </div>

            <div className="column" data-label="First Installment Date For Interest">
              {interestFirstInstallmentDate}
            </div>

            <div className="column" data-label="Last Installment Date For Interest">
              {interestLastInstallmentDate}
            </div>
          </div>

        </div>


        <div className="table">
          <div className="table-head">
            <div className="column" data-label="No of cycle">No of cycle</div>
            <div className="column" data-label="Group">Group</div>
          </div>

          <div className="row">
            <div className="column" data-label="Interest Rate">
            </div>

            <div className="column" data-label="Grace Period">
            </div>
          </div>
        </div>


      </div>

    );
  }


}

export default RepaymentScheduleHeaderView;
