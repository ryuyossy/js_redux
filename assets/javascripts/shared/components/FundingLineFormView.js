import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';



class FundingLineFormView extends BaseComponent {



  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }



  handleKeyDown(e){
    if(e.which == 13){ //enter
      var fundingSourceName = React.findDOMNode(this.refs.funding_source_name).value.trim();

      if (!fundingSourceName) {
        return;
      }
      let values = {
        fundingSourceName: fundingSourceName
      };

      this.props.actions.createFundingLine(values);

      React.findDOMNode(this.refs.funding_source_name).value = '';

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);

    return (
      <div className="row">
        <div className="fundLn">
          <div><b>Funding Source Name</b></div>
          <input type="text" placeholder="Funding Source Name" ref="funding_source_name" onKeyDown={this.handleKeyDown} />
        </div>
        {errorsNode}
      </div>
    );
  }

}

export default FundingLineFormView;
