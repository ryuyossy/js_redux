import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import LoanProductListView from './LoanProductListView';
import BaseComponent from './BaseComponent';

import * as LoanProductActions from '../actions/LoanProductActions';
import * as FundingLineActions from '../actions/FundingLineActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';

@connect(state => (
{
  loanProducts: state.loanProducts,
  fundingLines: state.fundingLines
}
))
@ReactMixin.decorate(History)
class LoanProductHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  handleClose(e){
    this.props.history.replaceState(null,"/settings/mf",null);
  }


  componentWillMount(){
    const { loanProducts, dispatch } = this.props;
    const loanProductActions = bindActionCreators(LoanProductActions, dispatch);
    loanProductActions.getLoanProducts();
    const fundingLineActions = bindActionCreators(FundingLineActions, dispatch);
    fundingLineActions.getFundingLines();
    return;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.loanProducts.isLoanProductUpdated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    let messageView = this.getMessageView("LoanProducts updated!","message");
    const { loanProducts, fundingLines,dispatch } = this.props;
    let actions = bindActionCreators(LoanProductActions, dispatch);

    return (
      <div className="loanProductsLayout">
        <div className="panel-heading">
          <div><i className="material-icons">settings</i></div>
          <div><strong>Loan Products</strong></div>
        </div>

        <div className="setsBox">
          <button className="btn waves-effect waves-light buttonM" onClick={this.handleClose} >Back to MF Settings</button>
          <LoanProductListView fundingLines={fundingLines.fundingLines} loanProductsStore={loanProducts} loanProducts={loanProducts.loanProducts} actions={actions} loanProductErrors={loanProducts.loanProductErrors} />
          {messageView}
        </div>
      </div>
    );
  }
}



export default LoanProductHandler;
