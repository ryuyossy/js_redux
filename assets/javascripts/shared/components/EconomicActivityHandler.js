import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import EconomicActivityListView from './EconomicActivityListView';
import BaseComponent from './BaseComponent';

import * as EconomicActivityActions from '../actions/EconomicActivityActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class EconomicActivityHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.economicActivities.isEconomicActivityUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("Economic Activities updated!","message");
    let economicActivities =  this.props.economicActivities;

    return (
      <div className="">
        <h6>Economic Activities</h6>
        <EconomicActivityListView economicActivities={economicActivities.economicActivities} actions={this.props.actions} economicActivitieErrors={economicActivities.economicActivitieErrors} />
        {messageView}
      </div>
    );
  }
}



export default EconomicActivityHandler;
