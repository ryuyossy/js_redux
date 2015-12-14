import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import FundingLineListView from './FundingLineListView';
import BaseComponent from './BaseComponent';

import * as FundingLineActions from '../actions/FundingLineActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class FundingLineHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.fundingLines.isFundingLineUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("FundingLines updated!","message");
    let fundingLines =  this.props.fundingLines;

    return (
      <div className="fundLines">
        <FundingLineListView fundingLines={fundingLines.fundingLines} actions={this.props.actions} fundingLineErrors={fundingLines.fundingLineErrors} />
        {messageView}
      </div>
    );
  }
}



export default FundingLineHandler;
