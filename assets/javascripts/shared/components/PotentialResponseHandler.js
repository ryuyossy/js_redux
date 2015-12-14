import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import PotentialResponseListView from './PotentialResponseListView';
import BaseComponent from './BaseComponent';

import * as PotentialResponseActions from '../actions/PotentialResponseActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class PotentialResponseHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.potentialResponses.isPotentialResponseUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("Potential Responses updated!","message");
    let potentialResponses =  this.props.potentialResponses;

    return (
      <div className="">
        <h6>Potential Response to the suggestions</h6>
        <PotentialResponseListView potentialResponses={potentialResponses.potentialResponses} actions={this.props.actions} potentialResponseErrors={potentialResponses.potentialResponseErrors} />
        {messageView}
      </div>
    );
  }
}



export default PotentialResponseHandler;
