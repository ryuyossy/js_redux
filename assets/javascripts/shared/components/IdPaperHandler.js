import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import IdPaperListView from './IdPaperListView';
import BaseComponent from './BaseComponent';

import * as IdPaperActions from '../actions/IdPaperActions';
import * as UserActions from '../actions/UserActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class IdPaperHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.idPapers.isIdPaperUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("ID Papers updated!","message");
    let idPapers =  this.props.idPapers;

    return (
      <div className="">
        <h6>ID Papers</h6>
        <IdPaperListView idPapers={idPapers.idPapers} actions={this.props.actions} idPaperErrors={idPapers.idPaperErrors} />
        {messageView}
      </div>
    );
  }
}



export default IdPaperHandler;
