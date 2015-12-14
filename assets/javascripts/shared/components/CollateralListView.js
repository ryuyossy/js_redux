import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Collateral from './CollateralView';
import BaseComponent from './BaseComponent';
import CollateralFormView from './CollateralFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class CollateralListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.collaterals == null || !this.props.collaterals.length){
      return (
        <div>
          <div className="row">
            <div className="col s4"><b>Name</b></div>
          </div>
          <CollateralFormView collateralsStore={this.props.collateralsStore}  actions={this.props.actions}  errors={this.props.collateralErrors} createCollateral={this.props.createCollateral} />
        </div>

      );
    }

    var collateralNodes = this.props.collaterals.map(function(collateral, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Collateral index={index+1}  errors={collateral.errors} key={collateral.id} collateral={collateral} id={collateral.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s4"><b>Name</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {collateralNodes}
      </ReactCSSTransitionGroup>
      <CollateralFormView collateralsStore={this.props.collateralsStore}  actions={this.props.actions} errors={this.props.collateralErrors} createCollateral={this.props.createCollateral} />
    </div>

    );
  }


}

export default CollateralListView;
