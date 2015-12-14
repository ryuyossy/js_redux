import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import LoanUsage from './LoanUsageView';
import BaseComponent from './BaseComponent';
import LoanUsageFormView from './LoanUsageFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class LoanUsageListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.loanUsages == null || !this.props.loanUsages.length){
      return (
        <div>
          <div className="row">
            <div className="col s2"><b>Loan usage</b></div>
          </div>
          <LoanUsageFormView actions={this.props.actions}  errors={this.props.loanUsageErrors} createLoanUsage={this.props.createLoanUsage} />
        </div>

      );
    }

    var loanUsageNodes = this.props.loanUsages.map(function(loanUsage, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <LoanUsage index={index+1}  errors={loanUsage.errors} key={loanUsage.id} loanUsage={loanUsage} id={loanUsage.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s2"><b>Loan usage</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {loanUsageNodes}
      </ReactCSSTransitionGroup>
      <LoanUsageFormView actions={this.props.actions} errors={this.props.loanUsageErrors} createLoanUsage={this.props.createLoanUsage} />
    </div>

    );
  }


}

export default LoanUsageListView;
