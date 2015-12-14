import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import PotentialCustomer from './PotentialCustomerView';
import BaseComponent from './BaseComponent';

class PotentialCustomerListView extends BaseComponent {
  render() {
    if(this.props.potential_customers == null || !this.props.potential_customers.length){
      return (<span></span>);
    }
    let self = this;
    var customerNodes = this.props.potential_customers.map(function(customer, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <PotentialCustomer key={customer.id} potential_customer={customer} id={customer.id}  />
      );
    });


    return (
      <table>
        <thead>
          <tr>
              <th data-field="id">id</th>
              <th data-field="first_name">first name</th>
              <th data-field="last_name">last name</th>
          </tr>
        </thead>
        <tbody>
          {customerNodes}
        </tbody>
      </table>
    );
  }


}

export default PotentialCustomerListView;
