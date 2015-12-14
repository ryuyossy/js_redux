import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import LoanContractCollateral from './LoanContractCollateralView';
import BaseComponent from './BaseComponent';
import LoanContractCollateralFormView from './LoanContractCollateralFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import { Link } from 'react-router';


class LoanContractCollateralListView extends BaseComponent {
  render() {
    let self = this;

    let linkParams = {customer_id: self.props.customer_id, loan_contract_id: self.props.loan_contract_id };

    if(this.props.loanContractCollaterals == null || !this.props.loanContractCollaterals.length){

      return (
        <div>
          <div className="row">
            <div className="col s2"><b>Name</b></div>
            <div className="col s2"><b>Price</b></div>
            <div className="col s2"></div>
          </div>
          <Link to={`/customers/${linkParams.customer_id}/loanContracts/${linkParams.loan_contract_id}/collaterals`} query={{amount: self.props.amount}}>
            Add new Collaterals
          </Link>
        </div>
      );
    }

    var loanContractCollateralNodes = this.props.loanContractCollaterals.map(function(loanContractCollateral, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <LoanContractCollateral loan_contract_id={self.props.loan_contract_id} customer_id={self.props.customer_id} index={index+1}  errors={loanContractCollateral.errors} key={loanContractCollateral.id} loanContractCollateral={loanContractCollateral} id={loanContractCollateral.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s2"><b>Name</b></div>
        <div className="col s2"><b>Price</b></div>
        <div className="col s2"></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {loanContractCollateralNodes}
      </ReactCSSTransitionGroup>
      <Link to={`/customers/${linkParams.customer_id}/loanContracts/${linkParams.loan_contract_id}/collaterals`}  query={{amount: self.props.amount}}>
        Add new Collaterals
      </Link>

    </div>

    );
  }


}

export default LoanContractCollateralListView;
