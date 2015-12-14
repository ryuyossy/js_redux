import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import EconomicActivity from './EconomicActivityView';
import BaseComponent from './BaseComponent';
import EconomicActivityFormView from './EconomicActivityFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class EconomicActivityListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.economicActivities == null || !this.props.economicActivities.length){
      return (
        <div>
          <div className="row">
            <div className="col s2"><b>Economic Activity</b></div>
          </div>
          <EconomicActivityFormView actions={this.props.actions}  errors={this.props.economicActivityErrors} createEconomicActivity={this.props.createEconomicActivity} />
        </div>

      );
    }

    var economicActivityNodes = this.props.economicActivities.map(function(economicActivity, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <EconomicActivity index={index+1}  errors={economicActivity.errors} key={economicActivity.id} economicActivity={economicActivity} id={economicActivity.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s2"><b>Economic Activity</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {economicActivityNodes}
      </ReactCSSTransitionGroup>
      <EconomicActivityFormView actions={this.props.actions} errors={this.props.economicActivityErrors} createEconomicActivity={this.props.createEconomicActivity} />
    </div>

    );
  }


}

export default EconomicActivityListView;
