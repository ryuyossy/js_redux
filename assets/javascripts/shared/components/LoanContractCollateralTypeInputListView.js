import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import BaseComponent from './BaseComponent';
import LoanContractCollateralTypeInputView from './LoanContractCollateralTypeInputView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class LoanContractCollateralTypeInputListView extends BaseComponent {
  render() {
    let self = this;
    let collateralId = this.props.collateralId;


    if(this.props.collateralTypes == null || !this.props.collateralTypes.length){
      return (
        <div>
        </div>
      );
    }


    var collateralTypeNodes = this.props.collateralTypes.map(function(collateralType, index) {
      let value = null;
      let collateralValueId = null;
      if(self.props.collateral_values){
        self.props.collateral_values.forEach(function(element, index){
          if(collateralType.id == element.id){
            value = element.value;
            collateralValueId = element.id;
          }
        });
      }

      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <LoanContractCollateralTypeInputView collateral_value_id={collateralValueId} value={value} onChange={self.props.onChange} collateralType={collateralType} collateralId={collateralId} index={index+1}  key={collateralType.id} id={collateralType.id}   />
      );
    });

    return (
    <div>
      <ReactCSSTransitionGroup transitionName="items">
          {collateralTypeNodes}
      </ReactCSSTransitionGroup>
    </div>

    );
  }


}

export default LoanContractCollateralTypeInputListView;
