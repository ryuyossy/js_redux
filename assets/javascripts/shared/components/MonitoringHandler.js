import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import MonitoringListView from './MonitoringListView';
import BaseComponent from './BaseComponent';

import * as MonitoringActions from '../actions/MonitoringActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class MonitoringHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.monitorings.isMonitoringUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("Monitoring updated!","message");
    let monitorings =  this.props.monitorings;

    return (
      <div className="">
        <h6>Monitoring</h6>
        <MonitoringListView monitorings={monitorings.monitorings} answerTypes={monitorings.answerTypes}  actions={this.props.actions} monitoringErrors={monitorings.monitoringErrors} />
        {messageView}
      </div>
    );
  }
}



export default MonitoringHandler;
