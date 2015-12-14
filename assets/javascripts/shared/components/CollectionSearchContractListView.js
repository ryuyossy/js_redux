import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import CollectionSearchContract from './CollectionSearchContractView';
import BaseComponent from './BaseComponent';

class CollectionSearchContractListView extends BaseComponent {
  render() {
    if(this.props.collections == null || !this.props.collections.length){
      return (<span></span>);
    }
    let self = this;

    var resultsNodes = this.props.collections.map(function(collection, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <CollectionSearchContract key={collection.id} collection={collection} loan_contract_id={collection.id} customer_id={collection.customer_id}  />
      );
    });

    return (
      <div className="searchClientResult">
        <div className="table">
          <div className="table-head">
            <div className="column" data-label="Contract No">CollectionSearchContract No</div>
            <div className="column" data-label="Status">Status Name</div>
            <div className="column" data-label="Disburstment Date">Disburstment Date</div>
            <div className="column" data-label="Loan Amount">Loan Amount</div>
            <div className="column" data-label="First Name">First Name</div>
            <div className="column" data-label="Last Name">Last Name</div>
            <div className="column" data-label="CO Responsible">CO Responsible</div>
            <div className="column" data-label="Branch">Branch</div>
          </div>
          {resultsNodes}
        </div>
      </div>
    );
  }


}

export default CollectionSearchContractListView;
