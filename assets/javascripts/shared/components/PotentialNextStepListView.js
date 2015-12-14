import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import PotentialNextStep from './PotentialNextStepView';
import BaseComponent from './BaseComponent';
import PotentialNextStepFormView from './PotentialNextStepFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class PotentialNextStepListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.potentialNextSteps == null || !this.props.potentialNextSteps.length){
      return (
        <div>
          <div className="row">
            <div className="col s6"><b>Next step</b></div>
          </div>
          <PotentialNextStepFormView actions={this.props.actions}  errors={this.props.potentialNextStepErrors} createPotentialNextStep={this.props.createPotentialNextStep} />
        </div>

      );
    }

    var potentialNextStepNodes = this.props.potentialNextSteps.map(function(potentialNextStep, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <PotentialNextStep index={index+1}  errors={potentialNextStep.errors} key={potentialNextStep.id} potentialNextStep={potentialNextStep} id={potentialNextStep.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s6"><b>Next step</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {potentialNextStepNodes}
      </ReactCSSTransitionGroup>
      <PotentialNextStepFormView actions={this.props.actions} errors={this.props.potentialNextStepErrors} createPotentialNextStep={this.props.createPotentialNextStep} />
    </div>

    );
  }


}

export default PotentialNextStepListView;
