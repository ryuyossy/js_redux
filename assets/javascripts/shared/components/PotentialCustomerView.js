import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';


class PotentialCustomerView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
  }


  componentWillReceiveProps(nextProps){

  }

  render() {

    return (
      <tr>
        <td>
          <Link to={`/potential_customers/${this.props.potential_customer.id}`} >
            {this.props.potential_customer.id}
          </Link>

        </td>
        <td>
            {this.props.potential_customer.first_name}
        </td>
        <td>
            {this.props.potential_customer.last_name}
        </td>

      </tr>
    );
  }


}



export default PotentialCustomerView;
