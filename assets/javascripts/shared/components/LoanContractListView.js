import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import LoanContract from './LoanContractView';
import BaseComponent from './BaseComponent';
import LoanContractFormView from './LoanContractFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import { Link } from 'react-router';


class LoanContractListView extends BaseComponent {
  render() {
    let self = this;

    let linkParams = {customer_id: self.props.customer_id};

    if(this.props.loanContracts == null || !this.props.loanContracts.length){

      return (

        <div className="grey lighten-5" style={{"marginBottom":"2em"}}>
          <table className="bordered">
                 <thead>
                   <tr>
                       <th data-field="contract_no">Contract No</th>
                       <th data-field="status">Status</th>
                       <th data-field="disbursement_date">Disbursement Date</th>
                       <th data-field="loan_amount">Loan Amount</th>
                   </tr>
                 </thead>
          </table>
          <div style={{margin:"auto", width:"400px"}}>
            <Link className="waves-effect waves-light btn" to={`/customers/${self.props.customer_id}/loanContracts`} >
              Create new individual loan contract
            </Link>
          </div>
        </div>

      );
    }

    var loanContractNodes = this.props.loanContracts.map(function(loanContract, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <LoanContract customer_id={self.props.customer_id} index={index+1}  errors={loanContract.errors} key={loanContract.id} loanContract={loanContract} id={loanContract.id} actions={self.props.actions}  />
      );
    });

    return (
      <div className="grey lighten-5" style={{"marginBottom":"2em"}}>
        <div className="searchClientResult">
          <div className="table">
            <div className="table-head">
              <div className="column" data-label="contract_no">Contract No</div>
              <div className="column" data-label="status">Status</div>
              <div className="column" data-label="disbursement_date">Disbursement Date</div>
              <div className="column" data-label="loan_amount">Loan Amount</div>
            </div>
            {loanContractNodes}
          </div>
        </div>

        <div style={{margin:"auto", width:"400px"}}>
          <Link className="waves-effect waves-light btn" to={`/customers/${self.props.customer_id}/loanContracts`} >
            Create new individual loan contract
          </Link>
        </div>
      </div>

    );
  }


}

export default LoanContractListView;
