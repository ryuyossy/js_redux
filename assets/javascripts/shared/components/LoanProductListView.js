import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import LoanProduct from './LoanProductView';
import BaseComponent from './BaseComponent';
import LoanProductFormView from './LoanProductFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class LoanProductListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.loanProducts == null || !this.props.loanProducts.length){
      return (
        <div>
          <LoanProductFormView loanProductsStore={this.props.loanProductsStore} fundingLines={this.props.fundingLines} actions={this.props.actions}  errors={this.props.loanProductErrors} createLoanProduct={this.props.createLoanProduct} />
        </div>

      );
    }

    var loanProductNodes = this.props.loanProducts.map(function(loanProduct, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <LoanProduct index={index+1}  errors={loanProduct.errors} key={loanProduct.id} loanProduct={loanProduct} id={loanProduct.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div><b>Name</b></div>
        <div><b>Contruct No</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {loanProductNodes}
      </ReactCSSTransitionGroup>
      <LoanProductFormView loanProductsStore={this.props.loanProductsStore} fundingLines={this.props.fundingLines} actions={this.props.actions} errors={this.props.loanProductErrors} createLoanProduct={this.props.createLoanProduct} />
    </div>

    );
  }


}

export default LoanProductListView;
