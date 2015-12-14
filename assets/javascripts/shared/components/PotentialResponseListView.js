import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import PotentialResponse from './PotentialResponseView';
import BaseComponent from './BaseComponent';
import PotentialResponseFormView from './PotentialResponseFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class PotentialResponseListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.potentialResponses == null || !this.props.potentialResponses.length){
      return (
        <div>
          <div className="row">
            <div className="col s6"><b>Potential Response to the suggestion</b></div>
          </div>
          <PotentialResponseFormView actions={this.props.actions}  errors={this.props.potentialResponseErrors} createPotentialResponse={this.props.createPotentialResponse} />
        </div>

      );
    }

    var potentialResponseNodes = this.props.potentialResponses.map(function(potentialResponse, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <PotentialResponse index={index+1}  errors={potentialResponse.errors} key={potentialResponse.id} potentialResponse={potentialResponse} id={potentialResponse.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s6"><b>Potential Response to the suggestion</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {potentialResponseNodes}
      </ReactCSSTransitionGroup>
      <PotentialResponseFormView actions={this.props.actions} errors={this.props.potentialResponseErrors} createPotentialResponse={this.props.createPotentialResponse} />
    </div>

    );
  }


}

export default PotentialResponseListView;
