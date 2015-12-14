import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import FundingLine from './FundingLineView';
import BaseComponent from './BaseComponent';
import FundingLineFormView from './FundingLineFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class FundingLineListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.fundingLines == null || !this.props.fundingLines.length){
      return (
        <div>
          <FundingLineFormView actions={this.props.actions}  errors={this.props.fundingLineErrors} createFundingLine={this.props.createFundingLine} />
        </div>

      );
    }

    var fundingLineNodes = this.props.fundingLines.map(function(fundingLine, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <FundingLine index={index+1}  errors={fundingLine.errors} key={fundingLine.id} fundingLine={fundingLine} id={fundingLine.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s2"><b>Funding Source Name</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {fundingLineNodes}
      </ReactCSSTransitionGroup>
      <FundingLineFormView actions={this.props.actions} errors={this.props.fundingLineErrors} createFundingLine={this.props.createFundingLine} />
    </div>

    );
  }


}

export default FundingLineListView;
