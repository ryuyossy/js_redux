import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import CollateralType from './CollateralTypeView';
import BaseComponent from './BaseComponent';
import CollateralTypeFormView from './CollateralTypeFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class CollateralTypeListView extends BaseComponent {
  render() {
    let self = this;
    let collateralId = this.props.collateralId;


    if(this.props.collateralTypes == null || !this.props.collateralTypes.length){
      return (
        <div>
          <CollateralTypeFormView dataTypes={this.props.dataTypes} collateralId={collateralId}   actions={this.props.actions}  errors={this.props.collateralTypeErrors} createCollateralType={this.props.createCollateralType} />
        </div>

      );
    }

    var collateralTypeNodes = this.props.collateralTypes.map(function(collateralType, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <CollateralType dataTypes={self.props.dataTypes} collateralId={collateralId} index={index+1}  errors={collateralType.errors} key={collateralType.id} collateralType={collateralType} id={collateralType.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <ReactCSSTransitionGroup transitionName="items">
          {collateralTypeNodes}
      </ReactCSSTransitionGroup>
      <CollateralTypeFormView dataTypes={this.props.dataTypes} collateralId={collateralId}  actions={this.props.actions} errors={this.props.collateralTypeErrors} createCollateralType={this.props.createCollateralType} />
    </div>

    );
  }


}

export default CollateralTypeListView;
