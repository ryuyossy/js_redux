import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import PotentialReason from './PotentialReasonView';
import BaseComponent from './BaseComponent';
import PotentialReasonFormView from './PotentialReasonFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class PotentialReasonListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.potentialReasons == null || !this.props.potentialReasons.length){
      return (
        <div>
          <div className="row">
            <div className="col s6"><b>Potential Reasons why they did not get from us</b></div>
          </div>
          <PotentialReasonFormView actions={this.props.actions}  errors={this.props.potentialReasonErrors} createPotentialReason={this.props.createPotentialReason} />
        </div>

      );
    }

    var potentialReasonNodes = this.props.potentialReasons.map(function(potentialReason, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <PotentialReason index={index+1}  errors={potentialReason.errors} key={potentialReason.id} potentialReason={potentialReason} id={potentialReason.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s6"><b>Potential Reasons why they did not get from us</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {potentialReasonNodes}
      </ReactCSSTransitionGroup>
      <PotentialReasonFormView actions={this.props.actions} errors={this.props.potentialReasonErrors} createPotentialReason={this.props.createPotentialReason} />
    </div>

    );
  }


}

export default PotentialReasonListView;
