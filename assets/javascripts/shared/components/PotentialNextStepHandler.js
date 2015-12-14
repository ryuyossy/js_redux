import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import PotentialNextStepListView from './PotentialNextStepListView';
import BaseComponent from './BaseComponent';

import * as PotentialNextStepActions from '../actions/PotentialNextStepActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class PotentialNextStepHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.potentialNextSteps.isPotentialNextStepUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("Next step updated!","message");
    let potentialNextSteps =  this.props.potentialNextSteps;

    return (
      <div className="">
        <h6>Potential NextSteps</h6>
        <PotentialNextStepListView potentialNextSteps={potentialNextSteps.potentialNextSteps} actions={this.props.actions} potentialNextStepErrors={potentialNextSteps.potentialNextStepErrors} />
        {messageView}
      </div>
    );
  }
}



export default PotentialNextStepHandler;
