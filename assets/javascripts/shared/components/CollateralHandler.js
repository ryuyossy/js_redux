import React from 'react';
import { State,History } from 'react-router';
import Immutable from 'immutable';
import CollateralListView from './CollateralListView';
import BaseComponent from './BaseComponent';

import * as CollateralActions from '../actions/CollateralActions';
import * as FundingLineActions from '../actions/FundingLineActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';

@connect(state => (
{
  collaterals: state.collaterals
}
))
@ReactMixin.decorate(History)
class CollateralHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  handleClose(e){
    this.props.history.replaceState(null, `/settings/mf`, null);
  }


  componentWillMount(){
    const { collaterals, dispatch } = this.props;
    const collateralActions = bindActionCreators(CollateralActions, dispatch);
    collateralActions.getCollaterals();
    return;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.collaterals.isCollateralUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    let messageView = this.getMessageView("Collaterals updated!","message");
    const { collaterals,dispatch } = this.props;
    let actions = bindActionCreators(CollateralActions, dispatch);

    return (
      <div className="">
        <CollateralListView collateralsStore={collaterals} collaterals={collaterals.collaterals} actions={actions} collateralErrors={collaterals.collateralErrors} />
        {messageView}
      </div>
    );
  }
}



export default CollateralHandler;
