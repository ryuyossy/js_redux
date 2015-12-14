import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';



class LoanUsageFormView extends BaseComponent {



  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }



  handleKeyDown(e){
    if(e.which == 13){ //enter
      var value = React.findDOMNode(this.refs.loan_usage).value.trim();

      if (!value) {
        return;
      }
      let values = {
        value: value
      };

      this.props.actions.createLoanUsage(values);

      React.findDOMNode(this.refs.loan_usage).value = '';

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);

    return (
      <div className="row">
        <div className="col s2">
          <input type="text" placeholder="Loan usage" ref="loan_usage" onKeyDown={this.handleKeyDown} />
        </div>
          {errorsNode}
      </div>
    );
  }

}

export default LoanUsageFormView;
