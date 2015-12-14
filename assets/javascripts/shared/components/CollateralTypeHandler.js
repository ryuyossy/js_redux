import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import CollateralTypeListView from './CollateralTypeListView';
import BaseComponent from './BaseComponent';

import * as CollateralTypeActions from '../actions/CollateralTypeActions';
import * as FundingLineActions from '../actions/FundingLineActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => (
{
  collateralTypes: state.collateralTypes
}
))
class CollateralTypeHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }



  componentWillMount(){
    const { collateralTypes,collateralId, dispatch } = this.props;
    const collateralTypeActions = bindActionCreators(CollateralTypeActions, dispatch);
    collateralTypeActions.getCollateralTypes(collateralId);
    return;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.collateralTypes.isCollateralTypeUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    let messageView = this.getMessageView("CollateralTypes updated!","message");
    const { collateralTypes,dispatch,collateralId } = this.props;
    let actions = bindActionCreators(CollateralTypeActions, dispatch);

    return (
      <div className="">
        <CollateralTypeListView collateralId={collateralId}  collateralTypesStore={collateralTypes} dataTypes={collateralTypes.dataTypes} collateralTypes={collateralTypes.collateralTypes} actions={actions} collateralTypeErrors={collateralTypes.collateralTypeErrors} />
        {messageView}
      </div>
    );
  }
}



export default CollateralTypeHandler;
