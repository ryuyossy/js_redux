import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Guarantor from './GuarantorView';
import BaseComponent from './BaseComponent';
import GuarantorFormView from './GuarantorFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import { Link } from 'react-router';


class GuarantorListView extends BaseComponent {
  render() {
    let self = this;

    let linkParams = {customer_id: self.props.customer_id, loan_contract_id: self.props.loan_contract_id };

    if(this.props.guarantors == null || !this.props.guarantors.length){

      return (
        <div>
          <div className="row">
            <div className="col s4"><b>First name</b></div>
            <div className="col s4"><b>Last name</b></div>
          </div>
          <Link to={`/customers/${linkParams.customer_id}/loanContracts/${linkParams.loan_contract_id}/guarantors`} query={{amount: self.props.amount}}>
            Add new guarantors
          </Link>
        </div>

      );
    }

    var guarantorNodes = this.props.guarantors.map(function(guarantor, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Guarantor loan_contract_id={self.props.loan_contract_id} customer_id={self.props.customer_id} index={index+1}  errors={guarantor.errors} key={guarantor.id} guarantor={guarantor} id={guarantor.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s4"><b>First name</b></div>
        <div className="col s4"><b>Last name</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {guarantorNodes}
      </ReactCSSTransitionGroup>
      <Link to={`/customers/${linkParams.customer_id}/loanContracts/${linkParams.loan_contract_id}/guarantors`} query={{amount: self.props.amount}}>
        Add new guarantors
      </Link>

    </div>

    );
  }


}

export default GuarantorListView;
