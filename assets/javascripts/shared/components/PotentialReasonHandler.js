import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import PotentialReasonListView from './PotentialReasonListView';
import BaseComponent from './BaseComponent';

import * as PotentialReasonActions from '../actions/PotentialReasonActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class PotentialReasonHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.potentialReasons.isPotentialReasonUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("Potential Reasons why they did not get from us updated!","message");
    let potentialReasons =  this.props.potentialReasons;

    return (
      <div className="">
        <h6>Potential Reasons why they did not get from us</h6>
        <PotentialReasonListView potentialReasons={potentialReasons.potentialReasons} actions={this.props.actions} potentialReasonErrors={potentialReasons.potentialReasonErrors} />
        {messageView}
      </div>
    );
  }
}



export default PotentialReasonHandler;
