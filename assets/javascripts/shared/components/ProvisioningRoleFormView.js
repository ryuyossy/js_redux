import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';



class ProvisioningRoleFormView extends BaseComponent {



  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }



  handleKeyDown(e){
    if(e.which == 13){ //enter
      var minNumberOfDaysPastDue = React.findDOMNode(this.refs.min_number_of_days_past_due).value.trim();
      var maxNumberOfDaysPastDue = React.findDOMNode(this.refs.max_number_of_days_past_due).value.trim();
      var forOLB = React.findDOMNode(this.refs.for_olb).value.trim();
      var forInterest = React.findDOMNode(this.refs.for_interest).value.trim();
      var forPenalty = React.findDOMNode(this.refs.for_penalty).value.trim();

      if (!minNumberOfDaysPastDue || !maxNumberOfDaysPastDue || !forOLB || !forInterest || !forPenalty) {
        return;
      }
      let values = {
        minNumberOfDaysPastDue: minNumberOfDaysPastDue,
        maxNumberOfDaysPastDue: maxNumberOfDaysPastDue,
        forOLB: forOLB,
        forInterest: forInterest,
        forPenalty: forPenalty
      };

      this.props.actions.createProvisioningRole(values);

      React.findDOMNode(this.refs.min_number_of_days_past_due).value = '';
      React.findDOMNode(this.refs.max_number_of_days_past_due).value = '';
      React.findDOMNode(this.refs.for_olb).value = '';
      React.findDOMNode(this.refs.for_interest).value = '';
      React.findDOMNode(this.refs.for_penalty).value = '';

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);

    return (
      <div className="row">
        <div className="proRoles">
          <div><b>Min number of days past due</b></div>
          <input type="text" placeholder="Min number of days past due" ref="min_number_of_days_past_due" onKeyDown={this.handleKeyDown} />
        </div>
        <div className="proRoles">
          <div><b>Max number of days past due</b></div>
          <input type="text" placeholder="Max number of days past due" ref="max_number_of_days_past_due" onKeyDown={this.handleKeyDown} />
        </div>
        <div className="proRoles">
          <div><b>For OLB</b></div>
          <input type="text" placeholder="For OLB(%)" ref="for_olb" onKeyDown={this.handleKeyDown} />
        </div>
        <div className="proRoles">
          <div><b>For Interest</b></div>
          <input type="text" placeholder="For Interest(%)" ref="for_interest" onKeyDown={this.handleKeyDown} />
        </div>
        <div className="proRoles">
          <div><b>For Penalty</b></div>
          <input type="text" placeholder="For Penalty(%)" ref="for_penalty" onKeyDown={this.handleKeyDown} />
        </div>
          {errorsNode}
      </div>
    );
  }

}

export default ProvisioningRoleFormView;
