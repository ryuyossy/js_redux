import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Monitoring from './MonitoringView';
import BaseComponent from './BaseComponent';
import MonitoringFormView from './MonitoringFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class MonitoringListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.monitorings == null || !this.props.monitorings.length){
      return (
        <div>
          <div className="row">
            <div className="col s5"><b>Question</b></div>
          </div>
          <div className="row">
            <div className="col s5"><b>Answer type</b></div>
          </div>
          <MonitoringFormView actions={this.props.actions} answerTypes={this.props.answerTypes}  errors={this.props.monitoringErrors} createMonitoring={this.props.createMonitoring} />
        </div>

      );
    }

    var monitoringNodes = this.props.monitorings.map(function(monitoring, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Monitoring index={index+1} answerTypes={self.props.answerTypes}  errors={monitoring.errors} key={monitoring.id} monitoring={monitoring} id={monitoring.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s5"><b>Question</b></div>
      </div>
      <div className="row">
        <div className="col s5"><b>Answer type</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {monitoringNodes}
      </ReactCSSTransitionGroup>
      <MonitoringFormView answerTypes={this.props.answerTypes} actions={this.props.actions} errors={this.props.monitoringErrors} createMonitoring={this.props.createMonitoring} />
    </div>

    );
  }


}

export default MonitoringListView;
