import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Repayment from './RepaymentView';
import BaseComponent from './BaseComponent';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import { Link } from 'react-router';


class RepaymentListView extends BaseComponent {

  createRepayments(){
    this.props.handleCalculateRepayments(false);
  }

  reloadRepayments(){
    this.props.handleCalculateRepayments(true);
  }

  render() {
    let self = this;

    let linkParams = {customer_id: self.props.customer_id, loan_contract_id: self.props.loan_contract_id };

    if(this.props.repayments == null || !this.props.repayments.length){

      return (
        <div>
          <div className="row">
            <button onClick={this.createRepayments.bind(this)} className="btn waves-effect waves-light" type="submit" name="action">Calculate Repayment Schedule
                <i className="mdi-content-send right"></i>
            </button>
          </div>
        </div>

      );
    }

    var repaymentNodes = this.props.repayments.map(function(repayment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Repayment loan_contract_id={self.props.loan_contract_id} customer_id={self.props.customer_id} index={index+1} key={repayment.id} repayment={repayment} id={repayment.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s4"><b>Payment Day</b></div>
        <div className="col s4"><b>Amount</b></div>
        <div className="col s4"><b>Paid?</b></div>
      </div>

      <div className="row">
        <button onClick={this.reloadRepayments.bind(this)} className="btn waves-effect waves-light" type="submit" name="action">Re-Calculate Repayment Schedule
            <i className="mdi-content-send right"></i>
        </button>
      </div>

      <ReactCSSTransitionGroup transitionName="items">
          {repaymentNodes}
      </ReactCSSTransitionGroup>
    </div>

    );
  }


}

export default RepaymentListView;
