import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Customer from './CustomerView';
import BaseComponent from './BaseComponent';

class CustomerListView extends BaseComponent {
  render() {
    if(this.props.customers == null || !this.props.customers.length){
      return (<span></span>);
    }
    let self = this;
    let searchForGroup = self.props.search_for_group;
    let forGroupMember = self.props.for_group_member;
    let handleAddToGroup = self.props.handleAddToGroup;
    let handleRemoveFromGroup = self.props.handleRemoveFromGroup;

    var customerNodes = this.props.customers.map(function(customer, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Customer editable={self.props.editable} handleRemoveFromGroup={handleRemoveFromGroup} handleAddToGroup={handleAddToGroup} for_group_member={forGroupMember}　search_for_group={searchForGroup} key={customer.id} customer={customer} id={customer.id}  />
      );
    });

    let extraColumn = (<span></span>)
    if(searchForGroup){
      extraColumn = (<div className="column" data-label="Add">Add</div>);
    }

    if(forGroupMember){
      extraColumn = (<div className="column" data-label="Remove">Remove</div>);
    }

    if(!this.props.editable){
      extraColumn = (<div></div>)
    }


    return (
      <div className="searchClientResult">
        <div className="table">
          <div className="table-head">
            <div className="column" data-label="Client No">Client No</div>
            <div className="column" data-label="First name">First name</div>
            <div className="column" data-label="Last name">Last name</div>
            <div className="column" data-label="CO Responsible">CO Responsible</div>
            <div className="column" data-label="Branch">Branch</div>
            {extraColumn}
          </div>
          {customerNodes}
        </div>
      </div>
    );
  }


}

export default CustomerListView;
